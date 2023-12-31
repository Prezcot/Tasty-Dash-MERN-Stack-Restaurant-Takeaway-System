const mongoose = require("mongoose");

//Orders.js & AdminDashboardData.js
const item = mongoose.model("orders", {
  username: String,
  order_id: String,
  payment_id: String,
  email: String,
  paypal_email: String,
  items: Array,
  order_status: String,
  instructions: String,
  order_total: String,
});

const refunds = mongoose.model("refunds", {
  username: String,
  order_id: String,
  payment_id: String,
  email: String,
  paypal_email: String,
  items: Array,
  order_status: String,
  instructions: String,
  order_total: String,
});

//Orders.js
// const order_identification = mongoose.model("order_id", {
//   orderID:Number,
// });

const order_identification = mongoose.model(
  "order_identification",
  new mongoose.Schema({
    orderID: Number,
  }),
  "order_ids"
);

//menu.js
const Menuitem = mongoose.model(
  "Menuitem",
  new mongoose.Schema({
    itemName: String,
    itemDescription: String,
    itemPrice: Number,
    itemImage: String,
    itemType: String,
  }),
  "menu"
);

//User.js
const UserSchema = new mongoose.Schema({
  username: String,
  type: String,
  email: String,
  phonenumber: String,
  password: String,
});
const users = mongoose.model("users", UserSchema); // you can now use this to create other users

module.exports = { item, order_identification, Menuitem, users, refunds };
