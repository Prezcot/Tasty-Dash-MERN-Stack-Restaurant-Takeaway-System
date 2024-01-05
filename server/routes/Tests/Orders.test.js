const request = require("supertest");
const express = require("express");
const orderRouter = require("../Orders");
const {item, order_identification, collected_orders, refunds} = require("../../Schemas/Schemas");
const {default: mongoose} = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
require("dotenv").config();

beforeAll(async () => {
    jest.setTimeout(10000);
    mongoServer = await MongoMemoryServer.create();
    const mongo_uri = mongoServer.getUri();
    await mongoose.connect(mongo_uri);

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

    const history_order2 = new refunds({
        __v: 0,
        _id: "6593f234cd4a4307d0f1d1cb",
        username: 'dummy_user',
        order_id: '98',
        payment_id: '0SH79786NP730565H',
        email: 'dummy2@gmail.com',
        paypal_email: 'sb-qrzuv28891158@personal.example.com',
        items: ['Spring rolls,1,1'],
        order_status: 'Refund Needed',
        instructions: 'dummy instruction2',
        order_total: '70.00',
    });
    history_order2.save();



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
        const updated_id = "106"
        const res=await request(app).put(`/orders/update_order_id/${document_id}`).send({ _id:document_id }, {orderID:updated_id});
        expect (res.text).toBe("Item updated successfully");
    })


    it("Successfully brings down data of a user from Mongo DB",async()=>{
        const res=await request(app).post("/orders/your_orders").send({user:"dummy_user"});
        expected_data ={
            live_order_items :[
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
            order_history_items: [
            {
                __v: 0,
                _id: "6593f234cd4a4307d0f1d1cb",
                username: 'dummy_user',
                order_id: '98',
                payment_id: '0SH79786NP730565H',
                email: 'dummy2@gmail.com',
                paypal_email: 'sb-qrzuv28891158@personal.example.com',
                items: ['Spring rolls,1,1'],
                order_status: 'Refund Needed',
                instructions: 'dummy instruction2',
                order_total: '70.00',
            },
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
            },

        ] 
        };
        expect(res.body).toEqual(expected_data);
        expect(res.status).toEqual(200);
      });
});