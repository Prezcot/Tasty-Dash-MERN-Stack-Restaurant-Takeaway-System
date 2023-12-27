const { default: mongoose } = require("mongoose");
const router = require("express").Router();
const { item, Menu, users } = require("../Schemas/Schemas");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/receive/order_data", async (req, res) => {
  try {
    let data = await item.find();
    res.json(data);
  } catch (err) {
    res.status(500);
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
    res.status(500);
  }
});

module.exports = router;
