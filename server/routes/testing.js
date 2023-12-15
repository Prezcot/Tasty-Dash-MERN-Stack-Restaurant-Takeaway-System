const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("Permission Denied");
});

router.post("/data/send", async (req, res) => {
  let data = req.body;
  console.log(data);
});

module.exports = router;
