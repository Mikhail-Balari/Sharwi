import { pool } from "../../db/pool";
import { toRelativeLabel } from "../../utils/date";
import { HttpError } from "../../utils/http-error";
import { CreateReviewInput } from "./review.schemas";

export async function createReview(input: CreateReviewInput) {
  const worker = await pool.query("SELECT id FROM worker_profiles WHERE id = $1", [input.workerProfileId]);
  if (!worker.rowCount) {
    throw new HttpError(404, "Worker profile not found.");
  }

  const result = await pool.query(
    `
      INSERT INTO reviews (worker_profile_id, company_id, reviewer_name, rating, summary)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [input.workerProfileId, input.companyId ?? null, input.reviewerName, input.rating, input.summary]
  );

  return result.rows[0];
}

export async function listReviewsForWorker(workerProfileId: string) {
  const result = await pool.query(
    `
      SELECT r.id, r.reviewer_name, r.rating, r.summary, r.created_at, c.name AS company_name
      FROM reviews r
      LEFT JOIN companies c ON c.id = r.company_id
      WHERE r.worker_profile_id = $1
      ORDER BY r.created_at DESC
    `,
    [workerProfileId]
  );

  return result.rows.map((row) => ({
    id: row.id,
    companyName: row.company_name ?? "Verified company",
    reviewerName: row.reviewer_name,
    rating: Number(row.rating),
    summary: row.summary,
    createdAtLabel: toRelativeLabel(new Date(row.created_at)),
  }));
}

export async function listReviewsForCurrentUser(userId: string) {
  const workerResult = await pool.query("SELECT id FROM worker_profiles WHERE user_id = $1", [userId]);
  const worker = workerResult.rows[0];
  if (!worker) {
    throw new HttpError(404, "Worker profile not found.");
  }

  return listReviewsForWorker(worker.id);
}
