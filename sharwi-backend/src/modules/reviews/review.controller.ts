import { Request, Response } from "express";

import { createReviewSchema } from "./review.schemas";
import { createReview, listReviewsForCurrentUser, listReviewsForWorker } from "./review.service";

export async function createReviewHandler(request: Request, response: Response) {
  const payload = createReviewSchema.parse(request.body);
  return response.status(201).json(await createReview(payload));
}

export async function listMyReviewsHandler(request: Request, response: Response) {
  return response.json(await listReviewsForCurrentUser(request.auth!.userId));
}

export async function listWorkerReviewsHandler(request: Request, response: Response) {
  return response.json(await listReviewsForWorker(request.params.id));
}
