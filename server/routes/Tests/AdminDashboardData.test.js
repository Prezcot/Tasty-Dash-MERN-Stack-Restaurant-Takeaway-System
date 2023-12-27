const request = require("supertest");
const express = require("express");
const adminDashboardData = require("../AdminDashboardData");

const app = express();
app.use(express.json());
app.use("/admin_dashboard_data", adminDashboardData);

describe("sanity test", () => {
  test("1 should equal 1", () => {
    expect(1).toBe(1);
  });
});

test("The root endpoint returns a 200 status", async () => {
  const response = await request(app).get("/admin_dashboard_data");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello");
});

test("The receive/order_data endpoint returns an array", async () => {
  const response = await request(app).get(
    "/admin_dashboard_data/receive/order_data"
  );
  expect(response.body).toEqual(expect.any(Array));
}, 10000);
