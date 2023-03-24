export class BankAccount {
  account_holder_id: number;
  type: string;

  constructor(account_holder_id: number, type: string) {
    this.account_holder_id = account_holder_id;
    this.type = type;
  }
}
