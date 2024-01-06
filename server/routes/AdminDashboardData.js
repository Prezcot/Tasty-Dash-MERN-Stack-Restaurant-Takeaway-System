const { default: mongoose } = require("mongoose");
const router = require("express").Router();
const {
  item,
  users,
  refunds,
  collected_orders,
} = require("../Schemas/Schemas");

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
    res.status(200).json(data);
  } catch (err) {
    res.status(500);
  }
});
router.get("/receive/order_collected_data", async (req, res) => {
  try {
    let data = await collected_orders.find();
    res.status(200).json(data);
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
    res.status(200).json("Data changed Successfully");
  } catch (err) {
    res.status(500);
  }
});

router.post("/move_to_refund", async (req, res) => {
  try {
    res.json("Promise fullfillment");
    const object_id = req.body.object_id;
    const data_to_move = await item.findByIdAndDelete(object_id);

    if (data_to_move) {
      data_to_move.order_status = "Refund Needed";
      const new_data = new refunds(data_to_move.toObject());
      await new_data.save();
      console.log("Data moved successfully!");
      res.status(200);
    } else {
      console.log("Data not found.");
      res.status(400);
    }
  } catch (error) {
    console.error("Error moving data:", error);
  }
});
router.post("/move_to_collected_orders", async (req, res) => {
  try {
    res.json("Promise fullfillment");
    const object_id = req.body.object_id;
    const data_to_move = await item.findByIdAndDelete(object_id);
    if (data_to_move) {
      data_to_move.order_status = "Order Has Been Collected";
      const new_data = new collected_orders(data_to_move.toObject());
      await new_data.save();

      console.log("Data moved successfully!");
      res.status(200);
    } else {
      console.log("Data not found.");
      res.status(400);
    }
  } catch (error) {
    console.error("Error moving data:", error);
  }
});

module.exports = router;
