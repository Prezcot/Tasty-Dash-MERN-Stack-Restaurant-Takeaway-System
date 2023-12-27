import React, { useRef, useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Paypal() {
  const paypal = useRef();
  const nav = useNavigate();
  let [latest_order_id,setLOID] = useState(0);
  
  
  async function notify() {
    toast.success("Your order has been placed", {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => {
        nav("/menu");
      },
    });
  }
  
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: sessionStorage.getItem("total"),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          let response = await axios.get("http://localhost:3001/orders/get_order_id");
          console.log("this is the axios response"+response);
          setLOID(latest_order_id=response.data);
          let temp = latest_order_id+1;
          console.log("temp varaible is:"+temp);
          let orderDetails = {
            username: sessionStorage.getItem("username"),
            order_id: temp,
            payment_id: order.id,
            email: sessionStorage.getItem("email"),
            items: JSON.parse(sessionStorage.getItem("cart")),
            order_status: "Pending",
            instructions: sessionStorage.getItem("customer_instruction"),
            order_total: sessionStorage.getItem("total"),
          };
    
        await axios.post("http://localhost:3001/orders/addorder", orderDetails);
        
        let document_id = '6589770129060833d3f653b1';
        await axios.put(`http://localhost:3001/orders/update_order_id/${document_id}`, {temp});
      
        sessionStorage.removeItem("menuCart");
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("order_id");
        sessionStorage.removeItem("total");
        
        notify();
        
        
        },
        onError: (err) => {console.log(err);
        },
      })
      .render(paypal.current);
      
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
      <ToastContainer/>
    </div>
  );
}