import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { login, me, register } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", authenticate, me);
