import { pool } from "../../db/pool";
import { toRelativeLabel } from "../../utils/date";
import { HttpError } from "../../utils/http-error";

export async function getFeed(userId: string) {
  const workerResult = await pool.query("SELECT id FROM worker_profiles WHERE user_id = $1", [userId]);
  const worker = workerResult.rows[0];
  if (!worker) {
    throw new HttpError(404, "Worker profile not found.");
  }

  const jobsResult = await pool.query(
    `
      SELECT id, title, verification_status, created_at
      FROM jobs
      WHERE worker_profile_id = $1
      ORDER BY created_at DESC
      LIMIT 3
    `,
    [worker.id]
  );

  const reviewsResult = await pool.query(
    `
      SELECT id, reviewer_name, created_at
      FROM reviews
      WHERE worker_profile_id = $1
      ORDER BY created_at DESC
      LIMIT 2
    `,
    [worker.id]
  );

  const feedItems = [
    ...jobsResult.rows.map((row) => ({
      id: row.id,
      type: "achievement",
      title: `${row.title} verification ${row.verification_status}`,
      summary: "Your verified work history is strengthening your Sharwi profile.",
      createdAtLabel: toRelativeLabel(new Date(row.created_at)),
    })),
    ...reviewsResult.rows.map((row) => ({
      id: row.id,
      type: "discovery",
      title: `New review from ${row.reviewer_name}`,
      summary: "Fresh collaborator feedback is now contributing to your trust signal.",
      createdAtLabel: toRelativeLabel(new Date(row.created_at)),
    })),
  ];

  return feedItems;
}

export async function getNotifications(userId: string) {
  const result = await pool.query(
    `
      SELECT id, title, body, created_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 20
    `,
    [userId]
  );

  return result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    createdAtLabel: toRelativeLabel(new Date(row.created_at)),
  }));
}
