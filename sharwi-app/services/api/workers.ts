import { apiRequest } from "@/services/api/client";
import { WorkerProfile, WorkerSummary } from "@/types/models";

export function fetchWorkers() {
  return apiRequest<WorkerSummary[]>("/workers");
}

export function fetchCurrentWorkerProfile() {
  return apiRequest<WorkerProfile>("/workers/me");
}
