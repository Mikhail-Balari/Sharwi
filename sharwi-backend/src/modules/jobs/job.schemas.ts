import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(2),
  companyName: z.string().min(2),
  companyId: z.string().uuid().optional(),
  summary: z.string().min(10),
  employmentType: z.string().min(2).default("full_time"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const verifyJobSchema = z.object({
  jobId: z.string().uuid(),
  status: z.enum(["approved", "rejected", "needs_more_info"]),
  note: z.string().default(""),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type VerifyJobInput = z.infer<typeof verifyJobSchema>;
