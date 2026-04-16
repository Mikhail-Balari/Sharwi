import { Request, Response } from "express";

import { getRequiredParam } from "../../utils/request";
import { updateProfileSchema } from "./worker.schemas";
import {
  getCurrentReputation,
  getCurrentWorkerProfile,
  getWorkerById,
  listWorkers,
  updateCurrentWorkerProfile,
} from "./worker.service";

export async function getWorkers(request: Request, response: Response) {
  const query = typeof request.query.q === "string" ? request.query.q : undefined;
  return response.json(await listWorkers(query));
}

export async function getWorker(request: Request, response: Response) {
  return response.json(await getWorkerById(getRequiredParam(request.params.id, "Worker")));
}

export async function getMyWorkerProfile(request: Request, response: Response) {
  return response.json(await getCurrentWorkerProfile(request.auth!.userId));
}

export async function updateMyWorkerProfile(request: Request, response: Response) {
  const payload = updateProfileSchema.parse(request.body);
  return response.json(await updateCurrentWorkerProfile(request.auth!.userId, payload));
}

export async function getMyReputation(request: Request, response: Response) {
  return response.json(await getCurrentReputation(request.auth!.userId));
}
