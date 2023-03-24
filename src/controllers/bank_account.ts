import { RequestHandler } from "express";
import client from "../client";
import { BankAccount } from "../models/bank_account";

export const create: RequestHandler = async (req, res, _next) => {
  const account_holder_id: number = +req.body.account_holder_id;
  const type: string = req.body.type;

  let bank_account = new BankAccount(account_holder_id, type);

  const bank_account = await client.bank_account.create({
    data: {
      account_holder_id,
      type,
    },
  });
  res.status(200).json(bank_account);
};
