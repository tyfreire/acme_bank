export class AccountHolder {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  is_valid(): boolean {
    return this.age >= 0 && this.name !== "";
  }
}
