import { bank_account_status, bank_account_type } from "@prisma/client";
import request from "supertest";
import app from "../../src/app";
import client from "../../src/client";
import { insert_account_holder, insert_bank_account } from "./helper.test";

describe("POST /api/v1/bank_accounts", () => {
  test("creates bank account and return 200", async () => {
    let account_holder = await insert_account_holder("johny", 55);

    const response = await request(app)
      .post("/api/v1/bank_accounts")
      .send({
        type: bank_account_type.CURRENT,
        account_holder_id: account_holder.id,
      })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);

    //body
    expect(response.body.id).toBeTruthy();
    expect(response.body.type).toBe(bank_account_type.CURRENT);
    expect(response.body.status).toBe(bank_account_status.OPEN);
    expect(response.body.account_holder_id).toBe(account_holder.id);

    //db
    const account = await client.bank_account.findFirst({
      where: { account_holder_id: account_holder.id },
    });

    expect(account).toBeTruthy();
    expect(account!.type).toBe(bank_account_type.CURRENT);
    expect(account!.status).toBe(bank_account_status.OPEN);
    expect(account!.account_holder_id).toBe(account_holder.id);
  });

  test("returns error when account holder not found", async () => {
    const response = await request(app)
      .post("/api/v1/bank_accounts")
      .send({
        type: bank_account_type.CURRENT,
        account_holder_id: 0,
      })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(422);

    expect(response.body.errors).toEqual([
      {
        message: "could not be found",
        field: "account_holder_id",
      },
    ]);
  });

  test("returns error when account holder attempt to duplicate accounts ", async () => {
    const account_holder = await insert_account_holder("johny", 55);
    await insert_bank_account(account_holder.id, bank_account_type.CURRENT);

    const response = await request(app)
      .post("/api/v1/bank_accounts")
      .send({
        bank_account_type: bank_account_type.CURRENT,
        account_holder_id: account_holder.id,
      })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(422);

    expect(response.body.errors).toEqual([
      {
        message: "Account holder already has an account of this type",
        field: "account_holder_id",
      },
    ]);
  });
});

describe("GET /api/v1/bank_accounts ", () => {
  test("list bank accounts and returns 200", async () => {
    const account_holder = await insert_account_holder("Dalia", 23);
    const bank_account = await insert_bank_account(
      account_holder.id,
      bank_account_type.CURRENT
    );

    const response = await request(app).get("/api/v1/bank_accounts");

    expect(response.statusCode).toBe(200);

    expect(response.body).toContainEqual(bank_account);
  });
});
