import { BankAccount } from "../../src/models/bank_account";
import { insert_bank_account } from "../helper";
import { insert_account_holder } from "../helper";
import { database_cleanup } from "../helper";
import { bank_account_status, bank_account_type } from "@prisma/client";

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
    test("checks if account holder id is valid", async () => {
      const bank_account = new BankAccount(-1, bank_account_type.CURRENT);

      expect(await bank_account.validate()).toBe(false);
      expect(bank_account.errors).toContainEqual({
        field: "account_holder_id",
        message: "could not be found",
      });
    });
    test("checks if bank account is unique", async () => {
      const account_holder = await insert_account_holder("John", 99);
      await insert_bank_account(account_holder.id, bank_account_type.CURRENT);

      const bank_account = new BankAccount(
        account_holder.id,
        bank_account_type.CURRENT
      );

      expect(await bank_account.validate()).toBe(false);
      expect(bank_account.errors).toEqual([
        {
          field: "account_holder_id",
          message: "Account holder already has an account of this type",
        },
      ]);
    });
    test("returns true if account holder id is valid and bank account is unique", async () => {
      const bank_account = new BankAccount(1, bank_account_type.CURRENT);

      expect(await bank_account.validate()).toBe(true);
      expect(bank_account.errors).toEqual([]);
    });
  });
});
