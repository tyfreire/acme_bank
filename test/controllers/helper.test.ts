import { bank_account_status, bank_account_type } from "@prisma/client";
import client from "../../src/client";

export async function insert_account_holder(name: string, age: number) {
  return await client.account_holder.create({
    data: { name, age },
  });
}

export async function insert_bank_account(
  account_holder_id: number,
  bank_account_type: bank_account_type
) {
  return await client.bank_account.create({
    data: {
      account_holder_id: account_holder_id,
      type: bank_account_type,
      status: bank_account_status.OPEN,
    },
  });
}
