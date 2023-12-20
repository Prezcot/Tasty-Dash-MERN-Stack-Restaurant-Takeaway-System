const express=require("express");
const router=express.Router();
let bcrypt=require("bcrypt");
const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.ATLAS_URI;
const UserSchema=new mongoose.Schema({username:String,type:String,email:String,phonenumber:String,password:String});
const users= mongoose.model("users",UserSchema); // you can now use this to create other users

router.get("/userinfo/:username",async (req,res,next)=>
{
    var username=req.params.username;
    var query=await users.find({username:username}).catch((err)=>res.status(400).json({message:err}));
    if (query.length>0)
    {
        res.status(200).json({username:query[0].username,email:query[0].email,phonenumber:query[0].phonenumber});
    }
});


router.post("/signin",async (req,res,next)=>{ //This route handler handles all signin requests
    const {username,email,phonenumber,password,cnfrmpassword}=req.body;
    console.log(password);
    var valid=false;
    var query=await users.find({username:username}).catch((err)=>res.status(400).json({message:err}));
    // var finddoc=await users.find({username:username,password:password}).catch((err)=>res.status(400).json({message:err}));

    if (query.length>0)
    {
        valid= await bcrypt.compare(password,query[0].password);
        console.log(query[0].password);
        console.log(valid);
    }
    if (query.length>0 && valid)
    {
        if (query[0].type=="User")
        {
            res.status(200).json({message:"Account Registered",user:"User"});
            console.log("Data Exists In Database (User)");
        }
        else{
            res.status(200).json({message:"Account Registered",user:"Admin"});
            console.log("Data Exists In Database (Admin)");
        }
    }
    else
    {
        res.status(400).json({message:"Account Not Registered/Invalid Credentials"});
        console.log("Data Does Not Exist In Database (Not User/Admin)");
    }
});

router.post("/signup",async(req,res,next)=>{ //This route handler handles all signup requests
    var {username,email,phonenumber,password} = req.body;
    var type="User";
    password= await bcrypt.hash(password,10); //figure out how to hash a password and save that hash to compare later.
    var finduser=await users.find({username:username}).catch((err)=>console.log(err));
    var findphonenumber=await users.find({phonenumber:phonenumber}).catch((err)=>console.log(err));
    var findemail=await users.find({email:email}).catch((err)=>console.log(err));
    if (finduser.length>0 || findphonenumber.length>0 || findemail.length>0)
    {
        res.status(400).json({message:"Account Already Exists"});
        console.log("Data Already Exists In Database");
    }
    else{
        const User=new users({username,type,email,phonenumber,password});
        console.log("Inserting");
        await User.save().then(()=>res.status(200).json({message:"Successful Register"})).catch((err)=>res.status(400).json({message:err}));
        //the anonymous function inside .then promise handler would have a parameter that is related to the outer function which is User.save
        //which is the response from User.save() basically.
    }
});

router.post("/checkpassword",async(req,res,next)=>{
    var {username,password}=req.body;
    var query= await users.find({username:username}).catch((err)=>console.log(err));

    if (query.length>0)
    {
        var valid=bcrypt.compare(password,query[0].password);
        if (valid)
        {
            res.status(200);
            console.log("Correct Password");
        }
        else{
            res.status(400).json({err:"Incorrect Password"});
            console.log("Incorrect Password");
        }
    }
    else{
        console.log("DEVERR:Account Not Existing (sessionStorage issue");
        res.status(400);
    }

});





module.exports=router;