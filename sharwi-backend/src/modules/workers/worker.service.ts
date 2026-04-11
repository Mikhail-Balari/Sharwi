import { pool } from "../../db/pool";
import { HttpError } from "../../utils/http-error";
import { UpdateProfileInput } from "./worker.schemas";

function mapWorkerSummary(row: Record<string, unknown>) {
  return {
    id: row.id,
    fullName: row.full_name,
    headline: row.headline,
    bio: row.bio,
    location: row.location,
    reputationScore: Number(row.score ?? 0),
    topSkills: Array.isArray(row.top_skills) ? row.top_skills : [],
  };
}

export async function listWorkers(query?: string) {
  const result = await pool.query(
    `
      SELECT
        wp.id,
        wp.full_name,
        wp.headline,
        wp.bio,
        wp.location,
        COALESCE(rs.score, 0) AS score,
        COALESCE(
          ARRAY_REMOVE(ARRAY_AGG(DISTINCT s.name), NULL),
          '{}'
        ) AS top_skills
      FROM worker_profiles wp
      LEFT JOIN reputation_scores rs
        ON rs.worker_profile_id = wp.id
        AND rs.id = (
          SELECT id
          FROM reputation_scores latest
          WHERE latest.worker_profile_id = wp.id
          ORDER BY latest.created_at DESC
          LIMIT 1
        )
      LEFT JOIN worker_skills ws ON ws.worker_profile_id = wp.id
      LEFT JOIN skills s ON s.id = ws.skill_id
      WHERE ($1::text IS NULL OR wp.full_name ILIKE '%' || $1 || '%' OR wp.headline ILIKE '%' || $1 || '%')
        AND wp.discoverable = TRUE
      GROUP BY wp.id, wp.full_name, wp.headline, wp.bio, wp.location, rs.score
      ORDER BY COALESCE(rs.score, 0) DESC, wp.created_at DESC
    `,
    [query ?? null]
  );

  return result.rows.map(mapWorkerSummary);
}

export async function getWorkerById(workerId: string) {
  const profileResult = await pool.query(
    `
      SELECT
        wp.id,
        wp.user_id,
        wp.full_name,
        wp.headline,
        wp.bio,
        wp.location,
        wp.years_experience,
        wp.discoverable
      FROM worker_profiles wp
      WHERE wp.id = $1
    `,
    [workerId]
  );

  const profile = profileResult.rows[0];
  if (!profile) {
    throw new HttpError(404, "Worker not found.");
  }

  const skillsResult = await pool.query(
    `
      SELECT s.name
      FROM worker_skills ws
      JOIN skills s ON s.id = ws.skill_id
      WHERE ws.worker_profile_id = $1
      ORDER BY s.name ASC
    `,
    [workerId]
  );

  const workHistoryResult = await pool.query(
    `
      SELECT id, company_name, title, verification_status
      FROM jobs
      WHERE worker_profile_id = $1
      ORDER BY created_at DESC
    `,
    [workerId]
  );

  return {
    id: profile.id,
    userId: profile.user_id,
    fullName: profile.full_name,
    headline: profile.headline,
    bio: profile.bio,
    location: profile.location,
    yearsExperience: profile.years_experience,
    discoverable: profile.discoverable,
    skills: skillsResult.rows.map((row) => row.name),
    workHistory: workHistoryResult.rows.map((row) => ({
      id: row.id,
      companyName: row.company_name,
      title: row.title,
      verificationStatus: row.verification_status,
    })),
  };
}

export async function getCurrentWorkerProfile(userId: string) {
  const result = await pool.query("SELECT id FROM worker_profiles WHERE user_id = $1", [userId]);
  const worker = result.rows[0];
  if (!worker) {
    throw new HttpError(404, "Worker profile not found.");
  }

  return getWorkerById(worker.id);
}

export async function updateCurrentWorkerProfile(userId: string, input: UpdateProfileInput) {
  const result = await pool.query(
    `
      UPDATE worker_profiles
      SET
        full_name = $2,
        headline = $3,
        bio = $4,
        location = $5,
        years_experience = $6,
        discoverable = $7,
        updated_at = NOW()
      WHERE user_id = $1
      RETURNING id
    `,
    [
      userId,
      input.fullName,
      input.headline,
      input.bio,
      input.location,
      input.yearsExperience,
      input.discoverable,
    ]
  );

  if (!result.rowCount) {
    throw new HttpError(404, "Worker profile not found.");
  }

  return getCurrentWorkerProfile(userId);
}

export async function getCurrentReputation(userId: string) {
  const workerProfile = await pool.query("SELECT id FROM worker_profiles WHERE user_id = $1", [userId]);
  const worker = workerProfile.rows[0];
  if (!worker) {
    throw new HttpError(404, "Worker profile not found.");
  }

  const result = await pool.query(
    `
      SELECT score, tier, verification_coverage, review_quality, evidence_quality, recency_score
      FROM reputation_scores
      WHERE worker_profile_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `,
    [worker.id]
  );

  const score = result.rows[0];
  if (!score) {
    return {
      value: 0,
      tier: "Emerging",
      summary: "No score available yet.",
      pillars: [],
    };
  }

  return {
    value: score.score,
    tier: score.tier,
    summary: "Reputation is built from verification, reviews, evidence, and recency.",
    pillars: [
      { label: "Verification", value: score.verification_coverage },
      { label: "Reviews", value: score.review_quality },
      { label: "Evidence", value: score.evidence_quality },
      { label: "Recency", value: score.recency_score },
    ],
  };
}
