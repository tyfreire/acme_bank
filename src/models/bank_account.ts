import { ValidateError } from "./validate_error";

import { bank_account_status, bank_account_type } from "@prisma/client";
import client from "../client";

export class BankAccount {
  account_holder_id: number;
  type: bank_account_type;
  status: bank_account_status;
  errors: ValidateError[];

  constructor(account_holder_id: number, type: bank_account_type) {
    this.account_holder_id = account_holder_id;
    this.type = type;
    this.status = bank_account_status.OPEN;
    this.errors = [];
  }

  async validate(): Promise<boolean> {
    let result = true;

    if (this.account_holder_id <= 0) {
      result = false;
      this.errors.push({
        field: "account_holder_id",
        message: "could not be found",
      });
    } else if (await this.has_bank_account()) {
      result = false;
      this.errors.push({
        field: "account_holder_id",
        message: "Account holder already has an account of this type",
      });
    }
    return result;
  }

  async has_bank_account(): Promise<boolean> {
    const bank_account = await client.bank_account.findFirst({
      where: {
        type: bank_account_type.CURRENT,
        account_holder_id: this.account_holder_id,
      },
    });

    return bank_account != null;
  }
}
