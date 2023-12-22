const router = require("express").Router();
const mongoose = require("mongoose");
const {item,Menu,users}=require("../Schemas/Schemas");

router.post("/addorder", async (req, res) => {
    try {
      const newOrder = req.body;
      const addedOrder = await item.create(newOrder);
      res.json(addedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add order to the database" });
    }
  });

module.exports=router;