let port = 3001;
let express = require('express');
let app = express();
let bodyParser=require("body-parser");
let cors=require("cors");
let User=require("./routes/User.js");
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:admin1234@restaurant-database.b7ewk2m.mongodb.net/?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.json());

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

app.listen(port,() => {
    console.log("Running on port: " + port);
});