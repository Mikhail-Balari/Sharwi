import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import {
  getMyReputation,
  getMyWorkerProfile,
  getWorker,
  getWorkers,
  updateMyWorkerProfile,
} from "./worker.controller";

export const workerRoutes = Router();

workerRoutes.get("/", getWorkers);
workerRoutes.get("/me", authenticate, getMyWorkerProfile);
workerRoutes.put("/me", authenticate, updateMyWorkerProfile);
workerRoutes.get("/me/reputation", authenticate, getMyReputation);
workerRoutes.get("/:id", getWorker);
