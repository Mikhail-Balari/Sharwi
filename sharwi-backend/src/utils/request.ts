import { HttpError } from "./http-error";

export function getRequiredParam(value: string | string[] | undefined, label = "Resource") {
  if (typeof value !== "string" || value.length === 0) {
    throw new HttpError(400, `${label} identifier is required.`);
  }

  return value;
}
