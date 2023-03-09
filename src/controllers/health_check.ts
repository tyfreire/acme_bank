import { RequestHandler } from "express";

export const health_check: RequestHandler = async (_req, res, _next) => {
  res.status(200).json({ message: "ok" });
};
