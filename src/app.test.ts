import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "./app";
import mongoose from "mongoose";

import { httpServer } from "./app";
//should save the username and password to database
// should return statusCodes.OK
{
  /*describe("Admin login endpoint", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).post("/api/admin/login").send({
      email: "rihanmainali@gmail.com",
      password: "rohan123",
    });
    expect(response.status).toBe(200);
  });
});
*/
}

/* describe("Get vehicle endpoint", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/getVehicle");
    expect(response.status).toBe(200);
  });
}); */

/* test("should return a json object with 200 status code", async () => {
  const response = await request(app).get("/api/getTopRatedVehicle");
  expect(response.status).toBe(200);
});

describe("Get verified vehicles only", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/getVerifiedVehicles");
    expect(response.status).toBe(200);
  });
});

describe("Get vehicle by user ID ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get(
      "/api/getVehicleByUser/64032c49d886bc91a8d0b59a"
    );
    expect(response.status).toBe(200);
  });
});

describe("Get single vehilce by its ID ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get(
      "/api/getVehicle/641f16ddfc0b39cf4c73e938"
    );
    expect(response.status).toBe(200);
  });
});

describe("Get vehicle requests that needs to be verified by admin ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/vehicleRequest");
    expect(response.status).toBe(200);
  });
});

describe("Get pending or rejected vehicle by user ID ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/viewAllVehicle");
    expect(response.status).toBe(200);
  });
}); */

// ----------------------KYC Testing -----------------------------------------

/* describe("Send OTP to Email for email verification", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).post("/api/sendEmailOTP").send({"email": "rohanmainali39@gmail.com", "id": "64032c49d886bc91a8d0b59a"});
    expect(response.status).toBe(200);
  });
});

describe("Get Pending KYC Requests", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/getKycRequest");
    expect(response.status).toBe(200);
  });
});

describe("Get All KYC requests ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/getAllKyc");
    expect(response.status).toBe(200);
  });
});


describe("Verify KYC request", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).post("/api/verifyKyc").send({"id": "64032c49d886bc91a8d0b59a"});
    expect(response.status).toBe(200);
  });
});
*/
// ------------------Category Management------------

/* describe("Get Category ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/getCategory");
    expect(response.status).toBe(200);
  });
});

describe("Get Category By its Id", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get(
      "/api/getCategory/64394e998b01987f84865e8b"
    );
    expect(response.status).toBe(200);
  });
});
 */
// ------------------Booking Management------------

/* describe("Get All Bookings ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/booking");
    expect(response.status).toBe(200);
  });
}); */

/* describe("Get Rentals of one owner ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get(
      "/api/getRentals/64032c49d886bc91a8d0b59a"
    );
    expect(response.status).toBe(200);
  });
});

describe("Get Bookings of particular vehicle ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get(
      "/api/booking/?vehicleId=64324071df8cc62add607c45"
    );
    expect(response.status).toBe(200);
  });
});
*/
// ------------------Review Management------------

describe("Get All Reviews ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get("/api/getReview");
    expect(response.status).toBe(200);
  });
});

/* describe("Get Review from user ID ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get(
      "/api/getReview/64032c49d886bc91a8d0b59a"
    );
    expect(response.status).toBe(200);
  });
});

describe("Get Review of particular vehicle ", () => {
  test("should return a json object with 200 status code", async () => {
    const response = await request(app).get(
      "/api/getReview/vehicle/64323d9edf8cc62add60736c"
    );
    expect(response.status).toBe(200);
  });
});
 */
afterAll(async () => {
  await new Promise((resolve) => httpServer.close(resolve));
});
