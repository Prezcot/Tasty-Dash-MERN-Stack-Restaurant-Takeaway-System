const request = require("supertest");
const express = require("express");
const adminDashboardData = require("../AdminDashboardData");
const { item } = require("../../Schemas/Schemas");
const { default: mongoose } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

// beforeAll(async () => {
//   const uri = process.env.ATLAS_URI;
//   await mongoose.connect(uri);
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });
beforeAll(async () => {
  const uri = process.env.ATLAS_URI;
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

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

// test("The receive/order_data endpoint returns an array", async () => {
//   const newOrder = new item({
//     username: "testUser",
//     order_id: "testOrder",
//     payment_id: "testPayment",
//     email: "testEmail",
//     items: [],
//     order_status: "testStatus",
//     instructions: "testInstructions",
//     order_total: "testTotal",
//   });

//   await newOrder.save();

//   const response = await request(app).get(
//     "/admin_dashboard_data/receive/order_data"
//   );
//   expect(response.body).toEqual(expect.any(Array));
// });
