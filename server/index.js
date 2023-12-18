let port = 3001;
let express = require("express");
let app = express();
let cors=require("cors");
app.use(express.json());
const mongoose = require('mongoose');
let User=require("./routes/User.js");
const testingRouter = require("./routes/testing");
const menuRouter = require("./routes/menu");
require("dotenv").config(); //so by using this basically when deploying to the cloud you would define
//these environment variables in the cloud service itself so that the public cannot see it in source code.
const uri = process.env.ATLAS_URI;
app.use(cors());
async function run() {
  try {
      await mongoose.connect(uri);
      console.log("You successfully connected to MongoDB!");
  } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
    }
};
run();

app.use("/users",User);
app.use("/menu", menuRouter);


app.get("/", (req, res) => {
  res.send("Hello there!!!")
});

app.use("/testing", testingRouter);

app.listen(port, () => {
  console.log("Listening on port: " + port);
})
