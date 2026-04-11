import { Router } from "express";

import { authRoutes } from "../modules/auth/auth.routes";
import { feedRoutes } from "../modules/feed/feed.routes";
import { jobRoutes } from "../modules/jobs/job.routes";
import { reviewRoutes } from "../modules/reviews/review.routes";
import { workerRoutes } from "../modules/workers/worker.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/", feedRoutes);
apiRouter.use("/workers", workerRoutes);
apiRouter.use("/jobs", jobRoutes);
apiRouter.use("/reviews", reviewRoutes);
