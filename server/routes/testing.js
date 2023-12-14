const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("Permission Denied");
});

router.route("/data/send").post(async (req, res) => {});

module.exports = router;
