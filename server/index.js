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
const menuRouter = require("./routes/Menu.js");
const adminDashboardData = require("./routes/AdminDashboardData");
const orderRouter = require("./routes/Orders.js");

const uri = process.env.ATLAS_URI;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}
run();

app.get("/test", (req, res) => {
  res.send("Hello there!!!");
});

app.use("/users", User);
app.use("/menu", menuRouter);
app.use("/admin_dashboard_data", adminDashboardData);
app.use("/orders", orderRouter);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("order_status_update", (data) => {
    const username = data.username; 
    const status = data.status;
    io.emit("order_status_update", { username: username, status: status });
    console.log("From Socket: " + username + status);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("product changes", () => {
    io.emit("product changes");
  });
});

server.listen(port, () => {
  console.log("Listening on port: " + port);
});
