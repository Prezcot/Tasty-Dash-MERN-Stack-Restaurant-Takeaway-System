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
        const res=await request(app).get(`/users/userinfo/${username}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
    });
});
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPassword'))
}));
describe("INTEGRATION TEST - User Route",()=>{
  it("Successfully Adds New Users To Database",async()=>{
    const res=await request(app).post("/users/signup",{username:"george",email:"george@gmail.com",phonenumber:"5438922345",password:"George123,"})
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({message:"Successful Register"});
    //const user=new users({username:"George",type:"User",email:"george@gmail.com",phonenumber:"5438922345",password:"George123,"});
    //await user.save();

  });
});