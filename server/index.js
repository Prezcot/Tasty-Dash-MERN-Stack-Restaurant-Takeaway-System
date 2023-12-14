let port = 3001;
let express = require('express');
let app = express();
let bodyParser=require("body-parser");
let cors=require("cors");
let User=require("./routes/User.js");
app.use(cors());
app.use(bodyParser.json());
app.use("/users",User);
app.listen(port,() => {
    console.log("Running on port: " + port);
});