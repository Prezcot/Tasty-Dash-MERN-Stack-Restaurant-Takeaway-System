let port = 3001;
let express = require('express');
let app = express();
let bodyParser=require("body-parser");
let cors=require("cors");
app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res) => {
    res.send('hello there!!!');
});

app.post("/register",(req,res,next)=>{
    const {username,email,phonenumber,address,password,cnfrmpassword}=req.body;
    console.log(username);
    res.status(200).json({message:"Successfully Received Data !"});
})
app.listen(port,() => {
    console.log("Running on port: " + port);
});