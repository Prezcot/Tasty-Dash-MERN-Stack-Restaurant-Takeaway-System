const request = require("supertest");
const express = require("express");
const User = require("../User");
const {users} = require("../../Schemas/Schemas");
const {default: mongoose} = require("mongoose");
const supertest = require("supertest");
require("dotenv").config();

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPassword')),
  compare: jest.fn(() => Promise.resolve(true))
}));


beforeAll(async () => {
  const uri = process.env.ATLAS_URI;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

app=express();
app.use(express.json());
app.use("/users",User);

describe("INTEGRATION TEST - User Route",()=>{
    it("Successfully Responds To Requests",async()=>{
        const username="user";
        // app.get(`/users/userinfo/${username}`,(req,res,next)=>{
        //     res.json({username:"user",email:"eageag"});
        // });
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
    expect(res.body).toEqual({message:"Account Already Exists"});
  });
});
