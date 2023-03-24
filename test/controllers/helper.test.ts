import client from "../../src/client";

export async function insert_account_holder(name: string, age: number) {
  return await client.account_holder.create({
    data: { name, age },
  });
}
