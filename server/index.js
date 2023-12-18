let port = 3001;
let express = require("express");
let app = express();
let cors = require("cors");
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");
app.use(cors());
let User = require("./routes/User.js");
const testingRouter = require("./routes/testing");
const menuRouter = require("./routes/menu");
const adminDashboardData = require("./routes/AdminDashboardData");

const uri = process.env.ATLAS_URI;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}
run();

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

app.use("/users", User);
app.use("/menu", menuRouter);
app.use("/testing", testingRouter);
app.use("/admin_dashboard_data", adminDashboardData);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
