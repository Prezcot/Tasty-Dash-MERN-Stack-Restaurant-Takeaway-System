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
var id = new mongoose.Types.ObjectId();
beforeAll(async () => {
  jest.setTimeout(10000);
  const uri = process.env.ATLAS_URI;
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  console.log("yesyes");
  const newOrder = new item({
    _id: id,
    username: "testUser",
    order_id: "testOrder",
    payment_id: "testPayment",
    email: "testEmail",
    items: [],
    order_status: "testStatus",
    instructions: "testInstructions",
    order_total: "testTotal",
  });
  await newOrder.save();
  console.log("yesyes");
  app = express();
  app.use(express.json());
  app.use("/admin_dashboard_data", adminDashboardData);
});
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

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
test("The refund data endpoint is ready", async () => {
  const response = await request(app).get("/admin_dashboard_data/receive/refund_data");
  expect(response.status).toBe(200);
});
test("The order collected data endpoint is ready", async () => {
  const response = await request(app).get("/admin_dashboard_data/receive/order_collected_data");
  expect(response.status).toBe(200);
});
test("The set order status endpoint is ready", async () => {
  const response = await request(app).put("/admin_dashboard_data/set_order_status").send({object_id:id,order_status:"testStatus"});
  expect(response.status).toBe(200);//how would we know the objectid
});
test("The receive/order_data endpoint returns an array", async () => {
  const response = await request(app).get(
    "/admin_dashboard_data/receive/order_data"
  );
  expect(response.body).toEqual(expect.any(Array));
});
