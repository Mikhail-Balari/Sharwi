import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(2),
  headline: z.string().min(2),
  bio: z.string().min(1),
  location: z.string().min(1),
  yearsExperience: z.number().int().min(0),
  discoverable: z.boolean(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
