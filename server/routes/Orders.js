const router = require("express").Router();
const mongoose = require("mongoose");
const {item,order_identification,users,collected_orders,refunds,}=require("../Schemas/Schemas");
// let order_id_count=0;

router.get('/get_order_id', async (req, res) => {
  try{
      let response = await order_identification.find({_id:"6589770129060833d3f653b1"});
      console.log(response[0].orderID);
      res.status(200).json(response[0].orderID);
  } catch (error){
      console.error(error);
      res.status(500).json({ message:"Internal Server Error" })
  }
});

router.post("/addorder", async (req, res) => {
    try {
      const newOrder = req.body;
      const addedOrder = await item.create(newOrder);
      res.json("Order placed successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add order to the database" });
    }
  });


  router.put("/update_order_id/:document_id", async (req, res) => {
    const document_id = decodeURIComponent(req.params.document_id);
    const updatedID = req.body.temp; /*OR const updatedID = req.body.temp;*/ 
    try {
      await order_identification.updateOne({ _id:document_id }, {orderID:updatedID});
      res.status(200).send("Item updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });


router.post("/your_orders", async(req,res) => {
  try{
    let user = req.body.user;
    // let notCollectedStatus = { $ne: "Collected" };
    // let condition1 = {username:user};
    // let condition2 = {order_status:notCollectedStatus};

    let liveOrderItems= await item.find({ username:user }).catch((err)=>res.status(400).json({message:err}));

    let refunded_orders = await refunds.find({ username:user }).catch((err)=>res.status(400).json({message:err}));
    let completed_orders = await collected_orders.find({ username:user }).catch((err)=>res.status(400).json({message:err}));

    let orderHistoryItems = [...refunded_orders, ...completed_orders];
    


    const allData = {
      liveOrderItems: liveOrderItems,
      orderHistoryItems: orderHistoryItems
    };

    res.status(200).json(allData);
  } catch (error){
    console.error(error);
    res.status(500).json({ message:"Internal Server Error" })
  }
});


// router.delete('/cancel_order/:orderId', async (req, res) => {
//   let cancel_id = req.params.orderId;

//   try {
//     console.log(`Deleting order with id: ${cancel_id}`);

//     // Use Mongoose to find and delete the document based on item name
//     let deletedItem = await item.findOneAndDelete({ order_id: cancel_id });

//     if (!deletedItem) {
//       console.log('Item not found');
//       return res.status(404).json({ error: 'Item not found' });
//     }

//     console.log('Item deleted successfully');
//     return res.json({ message: 'Item deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting item:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports=router;