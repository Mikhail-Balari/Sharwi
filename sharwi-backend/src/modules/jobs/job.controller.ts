import { Request, Response } from "express";

import { createJobSchema, verifyJobSchema } from "./job.schemas";
import { createJob, getJob, verifyJob } from "./job.service";

export async function createJobHandler(request: Request, response: Response) {
  const payload = createJobSchema.parse(request.body);
  return response.status(201).json(await createJob(request.auth!.userId, payload));
}

export async function verifyJobHandler(request: Request, response: Response) {
  const payload = verifyJobSchema.parse(request.body);
  return response.json(await verifyJob(request.auth!.userId, payload));
}

export async function getJobHandler(request: Request, response: Response) {
  return response.json(await getJob(request.params.id));
}
