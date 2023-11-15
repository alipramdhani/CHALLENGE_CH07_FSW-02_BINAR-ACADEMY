const request = require("supertest");
const app = require("../app");
// const baseURL = "http://localhost:8000"
const dotenv = require("dotenv");
dotenv.config();

describe("API check app", () => {
  it("app is running", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("error route is not found", async () => {
    const response = await request(app).get("/notfound");
    expect(response.statusCode).toBe(404);
  });
});
