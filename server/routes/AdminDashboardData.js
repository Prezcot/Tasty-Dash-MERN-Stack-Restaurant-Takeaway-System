const { default: mongoose } = require("mongoose");
const router = require("express").Router();
const item=require("../Schemas/Schemas");
// const item = mongoose.model("orders", {
//   username: String,
//   order_id: String,
//   payment_id: String,
//   email: String,
//   items: Array,
// });

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

router.put("/set_order_status", async (req, res) => {
  order_id = req.body.order_id;
  order_status = req.body.order_status;
  console.log(order_id, " ", order_status);
  try {
    await item.findByIdAndUpdate(order_id, {
      order_status: order_status,
    });
    res.json("Data changed Successfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
