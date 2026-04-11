import { pool } from "../../db/pool";
import { HttpError } from "../../utils/http-error";
import { CreateJobInput, VerifyJobInput } from "./job.schemas";

export async function createJob(userId: string, input: CreateJobInput) {
  const workerResult = await pool.query("SELECT id FROM worker_profiles WHERE user_id = $1", [userId]);
  const worker = workerResult.rows[0];
  if (!worker) {
    throw new HttpError(404, "Worker profile not found.");
  }

  const result = await pool.query(
    `
      INSERT INTO jobs (
        worker_profile_id,
        company_id,
        title,
        company_name,
        summary,
        employment_type,
        start_date,
        end_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
    [
      worker.id,
      input.companyId ?? null,
      input.title,
      input.companyName,
      input.summary,
      input.employmentType,
      input.startDate ?? null,
      input.endDate ?? null,
    ]
  );

  return result.rows[0];
}

export async function verifyJob(verifierUserId: string, input: VerifyJobInput) {
  const existing = await pool.query("SELECT id FROM jobs WHERE id = $1", [input.jobId]);
  if (!existing.rowCount) {
    throw new HttpError(404, "Job not found.");
  }

  await pool.query(
    `
      UPDATE jobs
      SET verification_status = $2
      WHERE id = $1
    `,
    [input.jobId, input.status]
  );

  const verificationResult = await pool.query(
    `
      INSERT INTO job_verifications (job_id, verifier_user_id, status, note)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [input.jobId, verifierUserId, input.status, input.note]
  );

  return verificationResult.rows[0];
}

export async function getJob(jobId: string) {
  const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [jobId]);
  if (!result.rowCount) {
    throw new HttpError(404, "Job not found.");
  }
  return result.rows[0];
}
