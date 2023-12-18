const { default: mongoose } = require("mongoose");
const router = require("express").Router();

const item = mongoose.model("orders", {
  username: String,
  order_id: String,
  payment_id: String,
  email: String,
  items: Array,
});

router.get("/", (req, res) => {
  res.send("Permission Denied");
});

router.get("/receive/order_data", async (req, res) => {
  try {
    let data = await item.find();
    res.json(data);
  } catch (err) {
    console.log("Admin Dashboard data wasn't sent");
  }
});

module.exports = router;
