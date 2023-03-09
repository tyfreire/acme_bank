import { RequestHandler } from "express";

export const health_check: RequestHandler = async (req, res, next) => {
  res.status(200).json({ message: "ok" });
};
