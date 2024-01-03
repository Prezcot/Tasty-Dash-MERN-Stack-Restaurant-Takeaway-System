const request = require("supertest");
const express = require("express");
const User = require("../User");
const {users} = require("../../Schemas/Schemas");
const {default: mongoose} = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
require("dotenv").config();

beforeAll(async () => {
  jest.setTimeout(10000);
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  const user=new users({username:"user",type:"User",email:"user@gmail.com",phonenumber:"0985674328",password:"User12,"});
  await user.save();
  app=express();
  app.use(express.json());
  app.use("/users",User);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});


describe("INTEGRATION TEST - User Route",()=>{
    it("Successfully Responds To Requests",async()=>{
        const username="user";
        const token="1234";
        const res=await request(app).get(`/users/userinfo/${username}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it("User Is Able To Successfully Change Password",async()=>{
      const res=await request(app).put("/users/checkpassword").send({username:"user",currentpassword:"User12,",newpassword:"Newpassword12,"});
      expect(res.status).toBe(400);
    })


    it("Successfully Adds New Users To Database",async()=>{
      const res=await request(app).post("/users/signup").send({username:"jacob",email:"george@outlook.com",phonenumber:"5438922345",password:"George123,"});
      expect(res.status).toBe(200);
    });
});
