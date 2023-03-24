import request from "supertest";
import app from "../../src/app";
//import client from "../../src/client";
import { insert_account_holder } from "./helper.test";

describe("POST /api/v1/bank_accounts", () => {
  test("creates bank account and return 200", async () => {
    let account_holder = await insert_account_holder("johny", 55);

    const response = await request(app)
      .post("/api/v1/bank_accounts")
      .send({ type: "current", account_holder_id: account_holder.id })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);

    //body
    expect(response.body.id).toBeTruthy();
    expect(response.body.type).toBe("current");
    expect(response.body.status).toBe("open");
    expect(response.body.account_holder_id).toBe(account_holder.id);

    //db
    // const accounts = await client.bank_account.findMany();
    // const account = accounts[0];
    // expect(account).toBeTruthy();
    // expect(account.type).toBe("current");
    // expect(account.status).toBe("open");
    // expect(account.account_holder_id).toBe(1);
  });
  xtest("returns error when account holder is not found", () => {});
  xtest("returns error when account holder attempt to duplicate accounts ", () => {});
});
