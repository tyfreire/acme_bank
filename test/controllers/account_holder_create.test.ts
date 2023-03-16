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

    const users = await client.account_holder.findMany();
    const user = users[0];
    expect(user).not.toBeUndefined();
    expect(user.id).not.toBeNull();
    expect(user.name).toEqual("john");
    expect(user.age).toEqual(40);
  });
});
