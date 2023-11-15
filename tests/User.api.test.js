const request = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();

describe("API Login", () => {
  it("success login", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123456",
    };
    const response = await request(app).post("/v1/auth/login").send(user);
    expect(response.statusCode).toBe(201);
  });

  it("failed login : wrong password", async () => {
    const failedUser = {
      email: "fikri@binar.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(401);
  });

  it("failed login : email is not registered", async () => {
    const failedUser = {
      email: "alif@binar.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(404);
  });
});

describe("API check token", () => {
  it("success check token", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6Ikpvam8iLCJlbWFpbCI6Impvam9AYmluYXIuY28uaWQiLCJpbWFnZSI6bnVsbCwicm9sZSI6eyJpZCI6MSwibmFtZSI6IkNVU1RPTUVSIn0sImlhdCI6MTcwMDAzNjY0MH0.fqJLyXERO8SzlY478mb2_BTgc7WaDIf3vRjgca3k6qE";
    const response = await request(app)
      .get("/v1/auth/whoami")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it("failed check token: wrong token", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6Ikpvam8iLCJlbWFpbCI6Impvam9AYmluYXIuY28uaWQiLCJpbWFnZSI6bnVsbCwicm9sZSI6eyJpZCI6MSwibmFtZSI6IkNVU1RPTUVSIn0sImlhdCI6MTcwMDAzNjY0MH0.fqJLyXERO8SzlY478mb2_BTgc7WaDIf3vRjgca3k6q3";
    const response = await request(app)
      .get("/v1/auth/whoami")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
  });
});
