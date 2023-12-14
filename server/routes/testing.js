const router = require("express").Router();
const mongoose = require("mongoose");

const item = mongoose.model("item", { name: String });

router.get("/", (req, res) => {
  res.send("Permission Denied");
});

router.post("/data/send", async (req, res) => {
  let data = req.body;
  saveName = new item({ name: data.name });

  confirm = await saveName.save();
  console.log("Item Saved:", confirm);
});

module.exports = router;
