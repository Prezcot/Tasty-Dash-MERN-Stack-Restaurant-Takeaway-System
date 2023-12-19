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
  router.post('/add', async (req, res) => {
    try {
      const newItemData = req.body;
  
      const addedItem = await Menu.create(newItemData);
      res.json(addedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add item to the database" });
    }
  });

module.exports = router;