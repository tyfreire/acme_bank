import { RequestHandler } from "express";
import client from "../client";
import { AccountHolder } from "../models/account_holder";

export const create: RequestHandler = async (req, res, _next) => {
  const name: string = req.body.name;
  const age: number = +req.body.age;

  let account_holder = new AccountHolder(name, age);

  if (account_holder.validate()) {
    const account_holder = await client.account_holder.create({
      data: { name, age },
    });
    res.status(200).json(account_holder);
  } else {
    res.status(400).json({
      errors: account_holder.errors,
    });
  }
};
export const index: RequestHandler = async (_req, res, _next) => {
  const account_holders = await client.account_holder.findMany();
  res.status(200).json(account_holders);
};
