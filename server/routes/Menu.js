const router = require("express").Router();
const mongoose = require("mongoose");
const {item,Menuitem,users}=require("../Schemas/Schemas");


/*testing*/
router.get('/data', async (req, res) => {
    try{
        const items= await Menuitem.find();
        res.status(200).json(items);
    } catch (error){
        console.error(error);
        res.status(500).json({ message:"Server is throwing a fit ryt now!" })
    }
  });
  router.post('/add', async (req, res) => {
    try {
      const new_item_data = req.body;
      const added_item = await Menuitem.create(new_item_data);
      res.status(200).json(added_item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add item to the database" });
    }
  });
  
  router.delete('/delete/:itemName', async (req, res) => {
    const item_name = decodeURIComponent(req.params.itemName);
  
    try {
      console.log(`Deleting item with name: ${item_name}`);
  
      // Use Mongoose to find and delete the document based on item name
      const deleted_item = await Menuitem.findOneAndDelete({ itemName: item_name });
  
      if (!deleted_item) {
        console.log('Item not found');
        return res.status(404).json({ error: 'Item not found' });
      }
  
      console.log('Item deleted successfully');
      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put("/edit/:itemName", async (req, res) => {
    const itemName = decodeURIComponent(req.params.itemName);
    const updatedItemData = req.body;
    try {
      await Menuitem.findOneAndUpdate({ itemName }, { $set: updatedItemData });
      res.status(200).send("Item updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
module.exports = router;