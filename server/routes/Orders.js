const router = require("express").Router();
const mongoose = require("mongoose");
const {
  item,
  order_identification,
  users,
  collected_orders,
  refunds,
} = require("../Schemas/Schemas");
// let order_id_count=0;

router.get("/get_order_id", async (req, res) => {
  try {
    let response = await order_identification.find({
      _id: "659aab5891c6823058f07bd4",
    });
    console.log(response[0].orderID);
    res.status(200).json(response[0].orderID);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/addorder", async (req, res) => {
  try {
    const new_order = req.body;
    const added_order = await item.create(new_order);
    res.json("Order placed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add order to the database" });
  }
});

router.put("/update_order_id/:document_id", async (req, res) => {
  const document_id = decodeURIComponent(req.params.document_id);
  const updated_id = req.body.temp; /*OR const updated_id = req.body.temp;*/
  try {
    await order_identification.updateOne(
      { _id: document_id },
      { orderID: updated_id }
    );
    res.status(200).send("Item updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/your_orders", async (req, res) => {
  try {
    let user = req.body.user;

    let live_order_items = await item
      .find({ username: user })
      .catch((err) => res.status(400).json({ message: err }));

    let refunded_orders = await refunds
      .find({ username: user })
      .catch((err) => res.status(400).json({ message: err }));
    let completed_orders = await collected_orders
      .find({ username: user })
      .catch((err) => res.status(400).json({ message: err }));

    let order_history_items = [...refunded_orders, ...completed_orders];

    const all_data = {
      live_order_items: live_order_items,
      order_history_items: order_history_items,
    };

    res.status(200).json(all_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
