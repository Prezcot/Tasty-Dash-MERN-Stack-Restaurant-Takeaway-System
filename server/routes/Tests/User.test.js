const request = require("supertest");
const express = require("express");
const User = require("../User");
const {users} = require("../../Schemas/Schemas");
const {default: mongoose} = require("mongoose");
const supertest = require("supertest");
require("dotenv").config();
beforeAll(async () => {
  const uri = process.env.ATLAS_URI;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

app=express();
app.use(express.json());
app.use("/users", User);

describe("UNIT TEST - User Route",()=>{
    it("Successfully Responds To Requests",async()=>{
        const username="user";
        const res=await supertest(app).get(`/users/userinfo/:${username}`).expect('Content-Type', /json/).expect(200);
        expect(res.body).toEqual(expect.any(Object));
    });
});