const request = require("supertest");
const express = require("express");
const User = require("../User");
const {users} = require("../../Schemas/Schemas");
const {default: mongoose} = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
require("dotenv").config();


// jest.mock('bcrypt', () => ({
//   hash: jest.fn(() => Promise.resolve('hashedPassword')),
//   compare: jest.fn(() => Promise.resolve(true))
// }));

beforeAll(async () => {
  const uri = process.env.ATLAS_URI;
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
        const res=await request(app).get(`/users/userinfo/${username}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
    });
    it("User Is Able To Successfully Change Password",async()=>{
      const res=await request(app).put("/users/checkpassword").send({username:"user",currentpassword:"User12,",newpassword:"Newpassword12,"});
      //console.log(res.body.message);
      expect(res.status).toBe(400);
    })
});

describe("INTEGRATION TEST - User Route",()=>{
  it("Successfully Adds New Users To Database",async()=>{
    const res=await request(app).post("/users/signup").send({username:"jacob",email:"george@outlook.com",phonenumber:"5438922345",password:"George123,"});
    expect(res.body).toEqual({message:"Successful Register"});
  });
});
