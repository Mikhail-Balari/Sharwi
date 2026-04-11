import bcrypt from "bcryptjs";

import { pool } from "../../db/pool";
import { HttpError } from "../../utils/http-error";
import { signToken } from "../../utils/jwt";
import { LoginInput, RegisterInput } from "./auth.schemas";

export async function registerUser(input: RegisterInput) {
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [input.email]);
  if (existing.rowCount) {
    throw new HttpError(409, "Email is already registered.");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const userResult = await client.query(
      `
        INSERT INTO users (email, password_hash, role)
        VALUES ($1, $2, 'worker')
        RETURNING id, email, role, created_at
      `,
      [input.email, passwordHash]
    );

    const user = userResult.rows[0];

    const profileResult = await client.query(
      `
        INSERT INTO worker_profiles (user_id, full_name, headline, bio, location)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, full_name, headline, bio, location, years_experience, discoverable
      `,
      [user.id, input.fullName, input.headline, input.bio, input.location]
    );

    const profile = profileResult.rows[0];

    await client.query(
      `
        INSERT INTO reputation_scores (
          worker_profile_id,
          score,
          tier,
          verification_coverage,
          review_quality,
          evidence_quality,
          recency_score
        )
        VALUES ($1, 50, 'Emerging', 40, 50, 50, 50)
      `,
      [profile.id]
    );

    await client.query("COMMIT");

    return {
      accessToken: signToken({ userId: user.id, role: user.role }),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      profile: {
        id: profile.id,
        fullName: profile.full_name,
        headline: profile.headline,
      },
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function loginUser(input: LoginInput) {
  const result = await pool.query(
    `
      SELECT id, email, role, password_hash
      FROM users
      WHERE email = $1
    `,
    [input.email]
  );

  const user = result.rows[0];
  if (!user) {
    throw new HttpError(401, "Invalid email or password.");
  }

  const isValidPassword = await bcrypt.compare(input.password, user.password_hash);
  if (!isValidPassword) {
    throw new HttpError(401, "Invalid email or password.");
  }

  return {
    accessToken: signToken({ userId: user.id, role: user.role }),
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

export async function getCurrentUser(userId: string) {
  const result = await pool.query(
    `
      SELECT id, email, role, created_at
      FROM users
      WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0] ?? null;
}
