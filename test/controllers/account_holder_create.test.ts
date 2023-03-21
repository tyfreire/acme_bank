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

describe("GET /api/v1/account_holders", () => {
  test("#index list all account holders and return 200", async () => {
    let user1 = await insert_account_holder("John", 33);
    let user2 = await insert_account_holder("Jane", 44);

    const response = await request(app).get("/api/v1/account_holders");

    expect(response.statusCode).toBe(200);

    expect(response.body).toContainEqual(user1);
    expect(response.body).toContainEqual(user2);
  });
});

async function insert_account_holder(name: string, age: number) {
  return await client.account_holder.create({
    data: { name, age },
  });
}

describe("GET /api/v1/account_holders/id", () => {
  test("#show account holder details by using id and return 200", async () => {
    let user = await insert_account_holder("John", 33);

    const response = await request(app).get(
      `/api/v1/account_holders/${user.id}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(user);
  });
  test("renders 404 when record is not found", async () => {
    const response = await request(app).get("/api/v1/account_holders/0");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      errors: [
        {
          field: "id",
          message: "could not be found",
        },
      ],
    });
  });
});
