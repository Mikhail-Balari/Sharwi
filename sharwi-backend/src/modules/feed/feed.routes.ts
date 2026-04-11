import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { feedHandler, notificationsHandler } from "./feed.controller";

export const feedRoutes = Router();

feedRoutes.get("/feed", authenticate, feedHandler);
feedRoutes.get("/notifications", authenticate, notificationsHandler);
