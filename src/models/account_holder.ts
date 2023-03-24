type ValidateError = { field: string; message: string };

export class AccountHolder {
  name: string;
  age: number;
  errors: ValidateError[];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.errors = [];
  }

  validate(): boolean {
    let result = true;

    if (this.age < 0) {
      result = false;
      this.errors.push({
        message: "cannot be less than 0",
        field: "age",
      });
    }

    if (this.name == "") {
      result = false;
      this.errors.push({
        message: "cannot be blank",
        field: "name",
      });
    }

    return result;
  }
}
