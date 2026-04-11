import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { createReviewHandler, listMyReviewsHandler, listWorkerReviewsHandler } from "./review.controller";

export const reviewRoutes = Router();

reviewRoutes.post("/", authenticate, createReviewHandler);
reviewRoutes.get("/", authenticate, listMyReviewsHandler);
reviewRoutes.get("/worker/:id", listWorkerReviewsHandler);
