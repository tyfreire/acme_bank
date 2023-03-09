const request = require("supertest");

describe("GET /api/v1/health-check", () => {
  test("return 200 with status ok", async () => {
    const response = await request("http://localhost:3000").get(
      "/api/v1/health-check"
    );

    expect(response.statusCode).toBe(200);

    const result = JSON.parse(response.res.text);
    expect(result.message).toEqual("ok");
  });
});
