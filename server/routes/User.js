const express=require("express");
const router=express.Router();
let bcrypt=require("bcrypt");
const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.ATLAS_URI;
const {item,users}=require("../Schemas/Schemas");
const jwt = require('jsonwebtoken');

router.get("/authentication",async (req,res,next)=>{ //This route handler handles all security requests
    const authHeader=req.headers.authorization;
    if(!authHeader) {
    res.status(400).json({message:'Authorization header missing'});
        return;
    }
    const token=authHeader.split(" ")[1];
    jwt.verify(token, 'r+43kcgH@9u309gXemm#COPv:BNV.;-I`p283$(?{X|b=5R&', (err, user) => {
        if (err) {
          res.status(400).json({message:'Invalid token'});
          return;
        }
        else if (user.role=="User")
        {
            res.status(200).json({message:'User'});
            return;
        }
        else if (user.role=="Admin")
        {
            res.status(200).json({message:'Admin'});
            return;
        }

      });
});

router.get("/userinfo/:username",async (req,res,next)=>
{
    const username=req.params.username;
    const authHeader=req.headers.authorization;
    console.log("ITS WORKIN");
    try{
        if(!authHeader) {
            res.status(400).json({message:'Authorization header missing'});
                return;
        }
        const token=authHeader.split(" ")[1];
        jwt.verify(token, 'r+43kcgH@9u309gXemm#COPv:BNV.;-I`p283$(?{X|b=5R&', (err, user) => {
            if (err) {
                res.status(400).json({message:'Invalid token'});
            return;
            }
            if (user.username!=username)
            {
                res.status(400).json({message:'Invalid Action'});
                return;
            }});
        console.log("ITS WORKIN");
        var query=await users.find({username:username}).catch((err)=>res.status(400).json({message:err}));
        if (query.length>0)
        {
            res.status(200).json({username:query[0].username,email:query[0].email,phonenumber:query[0].phonenumber});
        }
    }
    catch(err){
        res.status(400).json({message:err});
    }
});


router.post("/signin",async (req,res,next)=>{ //This route handler handles all signin requests
    const {username,email,phonenumber,password,cnfrmpassword}=req.body;
    var valid=false;
    try{
        var query=await users.find({username:username}).catch((err)=>res.status(400).json({message:err}));
        // var finddoc=await users.find({username:username,password:password}).catch((err)=>res.status(400).json({message:err}));

        if (query.length>0)
        {
            valid= await bcrypt.compare(password,query[0].password);
        }
        if (query.length>0 && valid)
        {

            if (query[0].type=="User")
            {
                const user = {
                    username: username,
                    role: "User"  // assuming your user has a role
                };
                const token = jwt.sign(user, 'r+43kcgH@9u309gXemm#COPv:BNV.;-I`p283$(?{X|b=5R&', { expiresIn: '1h' });
                res.status(200).json({message:"Account Registered",user:"User",email:query[0].email,token:token});
            }
            else{
                const user = {
                    username: username,
                    role: "Admin"  // assuming your user has a role
                };
                const token = jwt.sign(user, 'r+43kcgH@9u309gXemm#COPv:BNV.;-I`p283$(?{X|b=5R&', { expiresIn: '1h' });
                res.status(200).json({message:"Account Registered",user:"Admin",token:token});
            }

        }
        else
        {
            res.status(400).json({message:"Account Not Registered/Invalid Credentials"});
        }
    }catch(err){
        res.status(400).json({message:err});
    }
});

router.post("/signup",async(req,res,next)=>{ //This route handler handles all signup requests
    var {username,email,phonenumber,password} = req.body;
    var type="User";
    try{
        password= await bcrypt.hash(password,10);
        var finduser=await users.find({username:username}).catch((err)=>console.log(err));
        var findphonenumber=await users.find({phonenumber:phonenumber}).catch((err)=>console.log(err));
        var findemail=await users.find({email:email}).catch((err)=>console.log(err));
        if (finduser.length>0 || findphonenumber.length>0 || findemail.length>0)
        {
            res.status(400).json({message:"Account Already Exists"});
        }
        else{
            const User=new users({username,type,email,phonenumber,password});
            const user = {
                username: username,
                role: "User"  // assuming your user has a role
            };
            const token = jwt.sign(user, 'r+43kcgH@9u309gXemm#COPv:BNV.;-I`p283$(?{X|b=5R&', { expiresIn: '1h' });
            await User.save().then(()=>res.status(200).json({message:"Successful Register",token:token})).catch((err)=>res.status(400).json({message:err}));
            //the anonymous function inside .then promise handler would have a parameter that is related to the outer function which is User.save
            //which is the response from User.save() basically.
        }
    }catch(err){
        res.status(400).json({message:err});
    }
});

router.put("/checkpassword",async(req,res,next)=>{
    var {username,currentpassword,newpassword}=req.body;
    try{
        var query= await users.find({username:username}).catch((err)=>console.log(err));
        var hashedPassword= await bcrypt.hash(newpassword,10);
        if (query.length>0)
        {
            var valid= await bcrypt.compare(currentpassword,query[0].password);
            var doesExist=await bcrypt.compare(newpassword,query[0].password);
            if (valid)
            {
                if (!doesExist)
                {
                    await users.updateOne({username:username},{password:hashedPassword});
                    res.status(200).json({message:"Password Successfully Changed"});
                }
                else{
                    res.status(400).json({message:"Current & New Password Matching"});
                }
            }
            else{
                res.status(400).json({message:"Incorrect Password"});
            }
        }
        else{
            res.status(400).json({message:"Fatal Error"});
        }
    }catch(err){
        res.status(400).json({message:err});
    }
});

router.delete("/deleteaccount/:username",async(req,res,next)=>{
    var username=req.params.username;
    try{
        var query=await users.deleteOne({username:username});
        if (query)
        {
            res.status(200).json({message:"Successfully Deleted Account"});  
        }
        else{
            res.status(400).json({message:"Account Deletion Was Unsuccessful"});
        }
    }catch(err){
        res.status(400).json({message:err});
    }
})

module.exports=router;