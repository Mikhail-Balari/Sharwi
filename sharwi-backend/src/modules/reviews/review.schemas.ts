import { z } from "zod";

export const createReviewSchema = z.object({
  workerProfileId: z.string().uuid(),
  companyId: z.string().uuid().optional(),
  reviewerName: z.string().min(2),
  rating: z.number().min(1).max(5),
  summary: z.string().min(10),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
