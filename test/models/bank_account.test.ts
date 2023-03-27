import { BankAccount } from "../../src/models/bank_account";

import { bank_account_status, bank_account_type } from "@prisma/client";

describe("bank account class", () => {
  describe("constructor", () => {
    test("instanciates bank account", () => {
      const bank_account = new BankAccount(1, bank_account_type.CURRENT);

      expect(bank_account.account_holder_id).toEqual(1);
      expect(bank_account.type).toEqual(bank_account_type.CURRENT);
      expect(bank_account.status).toEqual(bank_account_status.OPEN);
    });
  });
});
