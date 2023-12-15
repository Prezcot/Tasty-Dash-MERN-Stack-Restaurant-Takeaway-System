let port = 3001;
let express = require("express");
let app = express();
let cors=require("cors");
const mongoose = require('mongoose');
let User=require("./routes/User.js");
const testingRouter = require("./routes/testing");
//const uri = "mongodb+srv://admin:admin1234@restaurant-database.b7ewk2m.mongodb.net/?retryWrites=true&w=majority";
require("dotenv").config();
const uri = process.env.ATLAS_URI;
app.use(cors());

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.connection.close();
    }
}
  
run();
app.use("/users",User);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

app.use("/testing", testingRouter);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
