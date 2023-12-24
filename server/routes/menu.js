const router = require("express").Router();
const mongoose = require("mongoose");


const {item,Menu,users}=require("../Schemas/Schemas");


/*testing*/
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
  
  router.delete('/delete/:itemName', async (req, res) => {
    const itemName = decodeURIComponent(req.params.itemName);
  
    try {
      console.log(`Deleting item with name: ${itemName}`);
  
      // Use Mongoose to find and delete the document based on item name
      const deletedItem = await Menu.findOneAndDelete({ itemName: itemName });
  
      if (!deletedItem) {
        console.log('Item not found');
        return res.status(404).json({ error: 'Item not found' });
      }
  
      console.log('Item deleted successfully');
      return res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.put("/edit/:itemName", async (req, res) => {
    const itemName = decodeURIComponent(req.params.itemName);
    const updatedItemData = req.body;
    try {
      await Menu.findOneAndUpdate({ itemName }, { $set: updatedItemData });
      res.status(200).send("Item updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
  
  
  
  

module.exports = router;