import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { createJobHandler, getJobHandler, verifyJobHandler } from "./job.controller";

export const jobRoutes = Router();

jobRoutes.post("/", authenticate, createJobHandler);
jobRoutes.post("/verify", authenticate, verifyJobHandler);
jobRoutes.get("/:id", authenticate, getJobHandler);
