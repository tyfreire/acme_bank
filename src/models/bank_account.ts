import { bank_account_status, bank_account_type } from "@prisma/client";

export class BankAccount {
  account_holder_id: number;
  type: bank_account_type;
  status: bank_account_status;

  constructor(account_holder_id: number, type: bank_account_type) {
    this.account_holder_id = account_holder_id;
    this.type = type;
    this.status = bank_account_status.OPEN;
  }
}
