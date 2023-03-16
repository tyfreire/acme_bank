import { AccountHolder } from "../../src/models/account_holder";

describe("account holder class", () => {
  describe("constructor", () => {
    test("instanciates account holder", () => {
      const account_holder = new AccountHolder("John", 87);

      expect(account_holder.name).toEqual("John");
      expect(account_holder.age).toEqual(87);
    });
  });

  describe("#is_valid", () => {
    test("returns true when it's valid", () => {
      const account_holder = new AccountHolder("John", 87);

      expect(account_holder.is_valid()).toBe(true);
    });

    test("returns false when name is invalid", () => {
      const account_holder = new AccountHolder("", 87);

      expect(account_holder.is_valid()).toBe(false);
    });

    test("returns false when age is invalid", () => {
      const account_holder = new AccountHolder("John", -17);

      expect(account_holder.is_valid()).toBe(false);
    });
  });
});
