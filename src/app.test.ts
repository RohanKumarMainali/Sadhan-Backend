import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "./app";

describe("admin login", () => {
  describe("give a username and password ", () => {
    //should save the username and password to database
    // should return statusCodes.OK
    test("should return a json object with 200 status code", async () => {
      const response = await request(app).post("/api/admin/login").send({
        username: "username",
        password: "password",
      });
      expect(response.status).toBe(200);
    });
  });
});
