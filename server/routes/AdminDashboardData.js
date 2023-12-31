const { default: mongoose } = require("mongoose");
const router = require("express").Router();
const { item, users, refunds } = require("../Schemas/Schemas");

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
router.get("/receive/refund_data", async (req, res) => {
  try {
    let data = await refunds.find();
    res.json(data);
  } catch (err) {
    res.status(500);
  }
});

router.put("/set_order_status", async (req, res) => {
  object_id = req.body.object_id;
  order_status = req.body.order_status;
  console.log(object_id, " ", order_status);
  try {
    await item.findByIdAndUpdate(object_id, {
      order_status: order_status,
    });
    res.json("Data changed Successfully");
  } catch (err) {
    res.status(500);
  }
});

router.post("/move_to_refund", async (req, res) => {
  try {
    res.json("Promise fullfillment");
    const object_id = req.body.object_id;
    console.log("Server AdminDashboard: ", object_id);
    const data_to_move = await item.findByIdAndDelete(object_id);
    console.log(data_to_move);
    if (data_to_move) {
      data_to_move.order_status = "Refund Needed";
      const new_data = new refunds(data_to_move.toObject());
      await new_data.save();

      console.log("Data moved successfully!");
    } else {
      console.log("Data not found.");
    }
  } catch (error) {
    console.error("Error moving data:", error);
  }
});

module.exports = router;
