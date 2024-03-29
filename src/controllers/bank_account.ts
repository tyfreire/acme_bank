import { RequestHandler } from "express";
import client from "../client";
import { BankAccount, update_to_close } from "../models/bank_account";

export const create: RequestHandler = async (req, res, _next) => {
  const account_holder_id: number = +req.body.account_holder_id;
  const type = req.body.type;

  const bank_account = new BankAccount(account_holder_id, type);

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

export const show: RequestHandler = async (req, res, _next) => {
  const id: number = +req.params.id;
  const bank_account = await client.bank_account.findUnique({
    where: { id: id },
  });

  if (bank_account) {
    res.status(200).json(bank_account);
  } else {
    res.status(404).json({
      errors: [
        {
          field: "id",
          message: "Bank account could not be found",
        },
      ],
    });
  }
};

export const destroy: RequestHandler = async (req, res, _next) => {
  const id: number = +req.params.id;

  const result = await client.bank_account.findUnique({ where: { id: id } });

  if (result) {
    const close_bank_account = await update_to_close(id);
    res.status(200).json(close_bank_account);
  } else {
    res.status(404).json({
      errors: [
        {
          field: "id",
          message: "Bank account could not be found",
        },
      ],
    });
  }
};
