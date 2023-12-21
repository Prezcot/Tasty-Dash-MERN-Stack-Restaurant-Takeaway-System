const mongoose = require("mongoose");
const item = mongoose.model("orders", {
  username: String,
  order_id: String,
  payment_id: String,
  email: String,
  items: Array,
  order_status: String,
});

module.exports = item;
