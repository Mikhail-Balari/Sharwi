import { Request, Response } from "express";

import { getFeed, getNotifications } from "./feed.service";

export async function feedHandler(request: Request, response: Response) {
  return response.json(await getFeed(request.auth!.userId));
}

export async function notificationsHandler(request: Request, response: Response) {
  return response.json(await getNotifications(request.auth!.userId));
}
