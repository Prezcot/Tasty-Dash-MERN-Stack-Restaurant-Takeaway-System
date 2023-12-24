const router = require("express").Router();
const mongoose = require("mongoose");
const {item,Menu,users}=require("../Schemas/Schemas");

router.post("/addorder", async (req, res) => {
    try {
      const newOrder = req.body;
      const addedOrder = await item.create(newOrder);
      res.json("order placed successfully: "+addedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add order to the database" });
    }
  });


router.post("/your_orders", async(req,res) => {
  try{
    let user = req.body.user;
    // let notCollectedStatus = { $ne: "Collected" };
    // let condition1 = {username:user};
    // let condition2 = {order_status:notCollectedStatus};
    let items= await item.find({ username:user }).catch((err)=>res.status(400).json({message:err}));
    res.json(items);
  } catch (error){
    console.error(error);
    res.status(500).json({ message:"Server is throwing a fit ryt now!" })
  }
});


router.delete('/cancel_order/:orderId', async (req, res) => {
  let cancel_id = req.params.orderId;

  try {
    console.log(`Deleting order with id: ${cancel_id}`);

    // Use Mongoose to find and delete the document based on item name
    let deletedItem = await item.findOneAndDelete({ order_id: cancel_id });

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

module.exports=router;