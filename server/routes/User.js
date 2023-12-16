const express=require("express");
const router=express.Router();
let bcrypt=require("bcrypt");
const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.ATLAS_URI;
const UserSchema=new mongoose.Schema({username:String,email:String,phonenumber:String,password:String});
const users= mongoose.model("users",UserSchema); // you can now use this to create other users


router.post("/signin",async (req,res,next)=>{ //This route handler handles all signin requests
    const {username,email,phonenumber,password,cnfrmpassword}=req.body;
    console.log(username);
    var query=await users.find({username:username,password:password}).catch((err)=>res.status(400).json({message:err}));
    if (query.length>0)
    {
        res.status(200).json({message:"Account Registered"});
        console.log("Data Exists In Database");
    }
    else
    {
        res.status(400).json({message:"Account Not Registered/Invalid Credentials"});
        console.log("Data Does Not Exist In Database");
    }
});

router.post("/signup",async(req,res,next)=>{ //This route handler handles all signup requests
    const {username,email,phonenumber,password} = req.body;
    //var password=bcrypt.hash(password,10); figure out how to hash a password and save that hash to compare later DO HASHING ON CLIENT SIDE
    var query=await users.find({username:username,phonenumber:phonenumber}).catch((err)=>console.log(err));
    if (query.length>0)
    {
        res.status(400).json({message:"Account Already Exists"});
        console.log("Data Already Exists In Database");
    }
    else{
        const User=new users({username,email,phonenumber,password});
        console.log("Inserting");
        await User.save().then(()=>res.status(200).json({message:"Successful Register"})).catch((err)=>res.status(400).json({message:err}));
        //the anonymous function inside .then promise handler would have a parameter that is related to the outer function which is User.save
        //which is the response from User.save() basically.
    }
})

module.exports=router;