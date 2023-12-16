const express=require("express");
const router=express.Router();
let bcrypt=require("bcrypt");
const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.ATLAS_URI;
const UserSchema=new mongoose.Schema({username:String,email:String,phonenumber:String,password:String});
const users= mongoose.model("user",UserSchema); // you can now use this to create other users

router.get('/',(req,res) => {
    res.send('hello there!!!');
});

router.post("/signin",async (req,res,next)=>{
    const {username,email,phonenumber,password,cnfrmpassword}=req.body;
    console.log(username);
    var query=null;
    query=await users.find({username:username}).catch((err)=>console.log(err));
    if (query.length>0)
    {
        console.log("Data Exists In Database");
    }
    else
    {
        res.status(400).json({error:"Account Not Registered"});
        console.log("Data Does Not Exist In Database");
    }
    //const User=new user({username,email,phonenumber,password})
    //await User.save().then(()=>res.status(200).json({message:"Successfully Received Data !"})).catch((err)=>res.status(400).json({error:"Unsuccessful"}));
});

router.post("/signup",(req,res,next)=>{

})

module.exports=router;