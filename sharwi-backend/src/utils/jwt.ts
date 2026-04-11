import jwt from "jsonwebtoken";

import { env } from "../config/env";

type AuthPayload = {
  userId: string;
  role: string;
};

export function signToken(payload: AuthPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AuthPayload;
}
