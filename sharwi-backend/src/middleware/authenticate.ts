import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/jwt";

export function authenticate(request: Request, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Authentication required." });
  }

  try {
    const token = authorization.replace("Bearer ", "");
    request.auth = verifyToken(token);
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token." });
  }
}
