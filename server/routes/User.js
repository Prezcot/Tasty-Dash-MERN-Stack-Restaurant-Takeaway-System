const express=require("express");
const router=express.Router();

router.get('/',(req,res) => {
    res.send('hello there!!!');
});

router.post("/register",(req,res,next)=>{
    const {username,email,phonenumber,address,password,cnfrmpassword}=req.body;
    console.log(username);
    res.status(200).json({message:"Successfully Received Data !"});
});

module.exports=router;