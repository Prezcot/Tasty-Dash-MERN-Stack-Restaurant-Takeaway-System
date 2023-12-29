// const router = require("express").Router();
// const mongoose = require("mongoose");
// const {item,order_identification,Menu,users}=require("../Schemas/Schemas");

// app.post('/api/refund', async (req, res) => {
//   const { captureId } = req.body;
//   const url = `https://api-m.sandbox.paypal.com/v2/payments/captures/${captureId}/refund`;
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer YOUR_ACCESS_TOKEN`
//   };

//   try {
//     const response = await axios.post(url, {}, { headers });
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to refund' });
//   }
// });
// app.listen(3000, () => console.log('Server started'));

// module.exports=router;
