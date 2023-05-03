import { bank_account_status, bank_account_type } from "@prisma/client";
import request from "supertest";
import app from "../../src/app";
import client from "../../src/client";
import {
  insert_account_holder,
  insert_bank_account,
  database_cleanup,
} from "../helper";

afterEach(async () => {
  await database_cleanup();
});

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

describe("GET /api/v1/bank_accounts/id", () => {
  test("shows bank account detail by id and return 200", async () => {
    const account_holder = await insert_account_holder("Jane", 33);
    const bank_account = await insert_bank_account(
      account_holder.id,
      bank_account_type.CURRENT
    );

    const response = await request(app).get(
      `/api/v1/bank_accounts/${bank_account.id}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(bank_account);
  });
});

describe("DELETE /api/v1/bank_accounts/id", () => {
  test("updates bank account and returns 200", async () => {
    let account_holder = await insert_account_holder("Frida", 25);
    const bank_account = await insert_bank_account(
      account_holder.id,
      bank_account_type.CURRENT
    );

    let response = await request(app).delete(
      `/api/v1/bank_accounts/${bank_account.id}`
    );

    expect(response.statusCode).toBe(200);

    expect(response.body.status).toBe("CLOSED");
  });
  test("if id is not valid returns 404", async () => {
    let response = await request(app).delete(`/api/v1/bank_accounts/0`);

    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toEqual([
      {
        message: "Bank account could not be found",
        field: "id",
      },
    ]);
  });
});
