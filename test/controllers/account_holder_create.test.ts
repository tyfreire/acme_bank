import request from "supertest";
import app from "../../src/app";
import client from "../../src/client";

describe("POST /api/v1/account_holders", () => {
  test("creates account holder and return 200", async () => {
    const response = await request(app)
      .post("/api/v1/account_holders")
      .send({ name: "john", age: 40 })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("john");
    expect(response.body.age).toBe(40);

    const users = await client.account_holder.findMany();
    const user = users[0];
    expect(user).not.toBeUndefined();
    expect(user.id).not.toBeNull();
    expect(user.name).toEqual("john");
    expect(user.age).toEqual(40);
  });

  test("returns error when there is an invalid field", async () => {
    const response = await request(app)
      .post("/api/v1/account_holders")
      .send({ name: "jack", age: -19 })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);

    expect(response.body.errors).toEqual([
      {
        message: "cannot be less than 0",
        field: "age",
      },
    ]);
  });
});
