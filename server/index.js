let port = 3001;
let express = require("express");
let app = express();
let cors = require("cors");

const testingRouter = require("./routes/testing");
const menuRouter = require("./routes/menu");

let mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(express.json());
app.use("/testing", testingRouter);
app.use("/menu", menuRouter);

app.get("/", (req, res) => {
  res.send("Hello there!!!")
});



app.listen(port, () => {
  console.log("Listening on port: " + port);
});
