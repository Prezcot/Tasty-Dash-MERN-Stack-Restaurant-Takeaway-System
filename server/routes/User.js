const express=require("express");
const router=express.Router();
let bcrypt=require("bcrypt");
const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.ATLAS_URI;
const {item,users}=require("../Schemas/Schemas");
const jwt = require('jsonwebtoken');

router.get("/authentication",async (req,res,next)=>{ //This route handler handles all security requests
    const auth_header=req.headers.authorization;
    if(!auth_header) {
    res.status(400).json({message:'Authorization header missing'});
        return;
    }
    const token=auth_header.split(" ")[1];
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
    var username=req.params.username;
    const auth_header=req.headers.authorization;
    var verified=true;
    if(!auth_header) {
        verified=false;
        res.status(400).json({message:'Authorization header missing'});
    }
    const token=auth_header.split(" ")[1];
    try{
        jwt.verify(token, 'r+43kcgH@9u309gXemm#COPv:BNV.;-I`p283$(?{X|b=5R&', (err, user) => {
            req.user = user;
        });
        username=req.user.username;
    }
    catch(err){
    }
    try{
        var query=await users.find({username:username});
        if (query.length>0)
        {
            res.status(200).json({username:query[0].username,email:query[0].email,phone_number:query[0].phonenumber});
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
    var {username,email,phone_number,password} = req.body;
    var type="User";
    try{
        password= await bcrypt.hash(password,10);
        var find_user=await users.find({username:username}).catch((err)=>console.log(err));
        var find_phone_number=await users.find({phonenumber:phone_number}).catch((err)=>console.log(err));
        var find_email=await users.find({email:email}).catch((err)=>console.log(err));
        if (find_user.length>0)
        {
            res.status(400).json({message:"Username Already Taken"});
        }
        else if(find_phone_number.length>0)
        {
            res.status(400).json({message:"Phone Number Already Taken"});
        }
        else if(find_email.length>0)
        {
            res.status(400).json({message:"Email Already Taken"});    
        }
        else{
            const new_user=new users({username,type,email,phone_number,password});
            const user = {
                username: username,
                role: "User"  // assuming your user has a role
            };
            const token = jwt.sign(user, 'r+43kcgH@9u309gXemm#COPv:BNV.;-I`p283$(?{X|b=5R&', { expiresIn: '1h' });
            await new_user.save().then(()=>res.status(200).json({message:"Successful Register",token:token})).catch((err)=>res.status(400).json({message:err}));
            //the anonymous function inside .then promise handler would have a parameter that is related to the outer function which is User.save
            //which is the response from User.save() basically.
        }
    }catch(err){
        res.status(400).json({message:err});
    }
});

router.put("/checkpassword",async(req,res,next)=>{
    var {username,current_password,new_password}=req.body;
    try{
        var query= await users.find({username:username}).catch((err)=>console.log(err));
        var hashed_password= await bcrypt.hash(new_password,10);
        if (query.length>0)
        {
            var valid= await bcrypt.compare(current_password,query[0].password);
            var does_exist=await bcrypt.compare(new_password,query[0].password);
            if (valid)
            {
                if (!does_exist)
                {
                    await users.updateOne({username:username},{password:hashed_password});
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