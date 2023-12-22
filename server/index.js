let port = 3001;
let express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
let cors = require("cors");
let app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
require("dotenv").config();

const User = require("./routes/User.js");
const testingRouter = require("./routes/testing");
const menuRouter = require("./routes/menu");
const adminDashboardData = require("./routes/AdminDashboardData");
const basketrouter = require("./routes/Basket.js");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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
app.use("/basket", basketrouter);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("order_status_update", () => {
    io.emit("order_status_update");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log("Listening on port: " + port);
});
