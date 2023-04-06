import { RequestHandler } from "express";
import client from "../client";
import { BankAccount } from "../models/bank_account";

export const create: RequestHandler = async (req, res, _next) => {
  const account_holder_id: number = +req.body.account_holder_id;
  const type = req.body.type;

  let bank_account = new BankAccount(account_holder_id, type);

  if (await bank_account.validate()) {
    const bank_account_1 = await client.bank_account.create({
      data: {
        account_holder_id: bank_account.account_holder_id,
        type: bank_account.type,
        status: bank_account.status,
      },
    });

    res.status(200).json(bank_account_1);
  } else {
    res.status(422).json({
      errors: bank_account.errors,
    });
  }
};
export const index: RequestHandler = async (_req, res, _next) => {
  const result = await client.bank_account.findMany();
  res.status(200).json(result);
};
