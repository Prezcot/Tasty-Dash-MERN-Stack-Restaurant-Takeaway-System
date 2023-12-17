const router = require("express").Router();
const mongoose = require("mongoose");



const Menu = mongoose.model('Menu', new mongoose.Schema({
    itemId: Number,
    itemName: String,
    itemDescription: String,
    itemPrice: Number,
    itemImage: String,
    quantity: Number
}),'menu');



router.get('/data', async (req, res) => {
    try{
        const items= await Menu.find();
        res.json(items);
    } catch (error){
        console.error(error);
        res.status(500).json({ message:"Server is throwing a fit ryt now!" })
    }
  });

module.exports = router;