import request from "supertest";
import app from "../../src/app";

describe("GET /api/v1/health-check", () => {
  test("return 200 with status ok", async () => {
    const response = await request(app).get("/api/v1/health-check");

    expect(response.statusCode).toBe(200);

    const result = JSON.parse(response.text);
    expect(result.message).toEqual("ok");
  });
});
