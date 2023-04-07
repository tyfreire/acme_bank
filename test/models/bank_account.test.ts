import { BankAccount } from "../../src/models/bank_account";
import { insert_account_holder, database_cleanup } from "../helper";
import {
  // account_holder,
  bank_account_status,
  bank_account_type,
} from "@prisma/client";
import client from "../../src/client";

afterEach(async () => {
  await database_cleanup();
});

describe("bank account class", () => {
  describe("constructor", () => {
    test("instanciates bank account", () => {
      const bank_account = new BankAccount(1, bank_account_type.CURRENT);

      expect(bank_account.account_holder_id).toEqual(1);
      expect(bank_account.type).toEqual(bank_account_type.CURRENT);
      expect(bank_account.status).toEqual(bank_account_status.OPEN);
    });
  });

  describe("#validate", () => {
    test("check if errors array is populated", async () => {
      const bank_account = new BankAccount(-1, bank_account_type.CURRENT);
      await bank_account.validate();
      expect(bank_account.errors).toContainEqual({
        field: "account_holder_id",
        message: "could not be found",
      });
    });
  });

  describe("#validate", () => {
    test("checks if account holder already has account", async () => {
      const account_holder = await insert_account_holder("Delia", 55);
      const bank_account = new BankAccount(
        account_holder.id,
        bank_account_type.CURRENT
      );

      await client.bank_account.create({
        data: {
          account_holder_id: bank_account.account_holder_id,
          type: bank_account_type.CURRENT,
          status: bank_account_status.OPEN,
        },
      });

      // expect(bank_account.account_holder_id).toBe(
      //   db_bank_account.account_holder_id
      // );

      expect(bank_account.validate()).toBe(false);
    });
  });
});
