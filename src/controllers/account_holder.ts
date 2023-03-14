import { RequestHandler } from "express";
import client from "../client";

export const create: RequestHandler = async (req, res, _next) => {
  const name: string = req.body.name;
  const age: number = req.body.age;

  const account_holder = await client.accountHolder.create({
    data: { name, age },
  });
  res.status(200).json(account_holder);
};
