import { AccountHolder } from "../../src/models/account_holder";

describe("account holder class", () => {
  describe("constructor", () => {
    test("instanciates account holder", () => {
      const account_holder = new AccountHolder("John", 87);

      expect(account_holder.name).toEqual("John");
      expect(account_holder.age).toEqual(87);
    });
  });

  describe("#validate", () => {
    test("returns true when valid", () => {
      const account_holder = new AccountHolder("John", 87);

      expect(account_holder.validate()).toBe(true);
    });

    test("returns false when name is an empty string", () => {
      const account_holder = new AccountHolder("", 87);

      expect(account_holder.validate()).toBe(false);
    });

    test("returns false when age is less than 0", () => {
      const account_holder = new AccountHolder("John", -17);

      expect(account_holder.validate()).toBe(false);
    });
  });
  describe("#errors", () => {
    test("populate errors array upon invalid results", () => {
      const account_holder = new AccountHolder("John", -17);

      let result = account_holder.validate();

      expect(result).toBe(false);

      expect(account_holder.errors).toEqual([
        { message: "cannot be less than 0", field: "age" },
      ]);
    });
    test("in case results are valid there should be no errors", () => {
      const account_holder = new AccountHolder("John", 87);

      let result = account_holder.validate();
      expect(result).toBe(true);

      expect(account_holder.errors).toEqual([]);
    });
  }),
    test("in case multiple fields are invalid there should be multiple errors", () => {
      const account_holder = new AccountHolder("", -17);

      let result = account_holder.validate();

      expect(result).toBe(false);

      expect(account_holder.errors).toEqual([
        {
          message: "cannot be less than 0",
          field: "age",
        },
        {
          message: "cannot be blank",
          field: "name",
        },
      ]);
    });
});
