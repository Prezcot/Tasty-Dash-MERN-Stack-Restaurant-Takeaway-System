const request = require("supertest");
const express = require("express");
const user = require("../User");
const { users } = require("../../Schemas/Schemas");
const { default: mongoose } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

beforeAll(async () => {
  jest.setTimeout(10000);
  mongo_server = await MongoMemoryServer.create();
  const mongo_uri = mongo_server.getUri();
  await mongoose.connect(mongo_uri);
  const new_user = new users({
    username: "user",
    type: "User",
    email: "user@gmail.com",
    phone_number: "0985674328",
    password: "User12,",
  });
  await new_user.save();
  app = express();
  app.use(express.json());
  app.use("/users", user);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo_server.stop();
});

describe("INTEGRATION TEST - User Route", () => {
  it("Successfully Responds To Requests", async () => {
    const username = "user";
    const token = "1234";
    const res = await request(app)
      .get(`/users/userinfo/${username}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("User Is Able To Successfully Change Password", async () => {
    const res = await request(app)
      .put("/users/checkpassword")
      .send({
        username: "user",
        current_password: "User12,",
        new_password: "Newpassword12,",
      });
    expect(res.status).toBe(400);
  });

  it("Successfully Adds New Users To Database", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        username: "jacob",
        email: "george@outlook.com",
        phone_number: "5438922345",
        password: "George123,",
      });
    expect(res.status).toBe(200);
  });
});
