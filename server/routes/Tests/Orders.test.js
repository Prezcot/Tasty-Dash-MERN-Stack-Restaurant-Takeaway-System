const request = require("supertest");
const express = require("express");
const orderRouter = require("../Orders");
const {item, order_identification, collected_orders} = require("../../Schemas/Schemas");
const {default: mongoose} = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
require("dotenv").config();

beforeAll(async () => {
    jest.setTimeout(10000);
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    const live_order = new item({
        __v: 0,
        _id: "65915ebd62be743115175d94",
        username: 'dummy_user',
        order_id: '100',
        payment_id: '0SV99753NP730560E',
        email: 'dummy@gmail.com',
        paypal_email: 'sb-qrzuv28891158@personal.example.com',
        items: ['Spring rolls,1,1'],
        order_status: 'Pending',
        instructions: 'dummy instruction',
        order_total: '59.99',
    });
    live_order.save();

    const history_order = new collected_orders({
        __v: 0,
        _id: "65941714a276e08e8b93aa78",
        username: 'dummy_user',
        order_id: '99',
        payment_id: '0SV99753NP730560E',
        email: 'dummy@gmail.com',
        paypal_email: 'sb-qrzuv28891158@personal.example.com',
        items: ['Spring rolls,1,1'],
        order_status: 'Order Has Been Collected',
        instructions: 'dummy instruction',
        order_total: '59.99',
    });
    history_order.save();

    const orderID = new order_identification({
        _id:"6589770129060833d3f653b1",
        orderID: "105",
    });
    orderID.save()
    

    app=express();
    app.use(express.json());
    app.use("/orders",orderRouter);
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });


  describe("INTEGRATION TESTS - Order Route",()=>{

    it("Successfully adds order to Mongo DB",async()=>{
        const res=await request(app).post("/orders/addorder").send({
        username: 'new_user',
        order_id: '99',
        payment_id: '0SV99753NP73056GH1',
        email: 'new@gmail.com',
        paypal_email: 'sb-qrzuv28891158@personal.example.com',
        items: ['Pizza,1,1'],
        order_status: 'Pending',
        instructions: 'new instruction',
        order_total: '1.00',
    });
        expect(res.body).toEqual("Order placed successfully");
    });


    it("Successfully gets existing order_id from Mongo DB",async()=>{
        const res=await request(app).get("/orders/get_order_id");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(105);
    });


    it("Successfully updates mongo db with new order id",async()=>{
        const document_id = "6589770129060833d3f653b1";
        const updatedID = "106"
        const res=await request(app).put(`/orders/update_order_id/${document_id}`).send({ _id:document_id }, {orderID:updatedID});
        expect (res.text).toBe("Item updated successfully");
    })


    it("Successfully brings down data of a user from Mongo DB",async()=>{
        const res=await request(app).post("/orders/your_orders").send({user:"dummy_user"});
        expectedData ={
            liveOrderItems :[
            {
            __v: 0,
            _id: "65915ebd62be743115175d94",
            username: 'dummy_user',
            order_id: '100',
            payment_id: '0SV99753NP730560E',
            email: 'dummy@gmail.com',
            paypal_email: 'sb-qrzuv28891158@personal.example.com',
            items: ['Spring rolls,1,1'],
            order_status: 'Pending',
            instructions: 'dummy instruction',
            order_total: '59.99',
            }
        ],
        orderHistoryItems: [
            {
                __v: 0,
                _id: "65941714a276e08e8b93aa78",
                username: 'dummy_user',
                order_id: '99',
                payment_id: '0SV99753NP730560E',
                email: 'dummy@gmail.com',
                paypal_email: 'sb-qrzuv28891158@personal.example.com',
                items: ['Spring rolls,1,1'],
                order_status: 'Order Has Been Collected',
                instructions: 'dummy instruction',
                order_total: '59.99',
            }
        ] 
        };
        expect(res.body).toEqual(expectedData);
        expect(res.status).toEqual(200);
      });
});