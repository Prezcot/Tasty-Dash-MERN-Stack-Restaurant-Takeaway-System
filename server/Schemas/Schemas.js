const mongoose = require('mongoose');

//AdminDashboardData.js
const item = mongoose.model("orders", {
  username: String,
  order_id: String,
  payment_id: String,
  email: String,
  items: Array,
});

//menu.js
const Menu = mongoose.model('Menu', new mongoose.Schema({
    itemName: String,
    itemDescription: String,
    itemPrice: Number,
    itemImage: String,
    quantity: Number
}),'menu');

//User.js
const UserSchema=new mongoose.Schema({username:String,type:String,email:String,phonenumber:String,password:String});
const users= mongoose.model("users",UserSchema); // you can now use this to create other users

module.exports={item,Menu,users};