import { Request, Response } from "express";
import { ZodError } from "zod";

import { loginSchema, registerSchema } from "./auth.schemas";
import { getCurrentUser, loginUser, registerUser } from "./auth.service";

export async function register(request: Request, response: Response) {
  try {
    const payload = registerSchema.parse(request.body);

    const result = await registerUser(payload);

    return response.status(201).json(result);

  } catch (error: any) {

    if (error instanceof ZodError) {
      return response.status(400).json({
        error: "Validation error",
        details: error.errors
      });
    }

    if (error.statusCode) {
      return response.status(error.statusCode).json({
        error: error.message
      });
    }

    console.error("Register error:", error);

    return response.status(500).json({
      error: "Internal server error"
    });
  }
}

export async function login(request: Request, response: Response) {
  try {
    const payload = loginSchema.parse(request.body);

    const result = await loginUser(payload);

    return response.json(result);

  } catch (error: any) {

    if (error instanceof ZodError) {
      return response.status(400).json({
        error: "Validation error",
        details: error.errors
      });
    }

    if (error.statusCode) {
      return response.status(error.statusCode).json({
        error: error.message
      });
    }

    console.error("Login error:", error);

    return response.status(500).json({
      error: "Internal server error"
    });
  }
}

export async function me(request: Request, response: Response) {
  try {
    const userId = request.auth?.userId;

    if (!userId) {
      return response.status(401).json({
        error: "Unauthorized"
      });
    }

    const result = await getCurrentUser(userId);

    return response.json(result);

  } catch (error) {

    console.error("Me error:", error);

    return response.status(500).json({
      error: "Internal server error"
    });
  }
}