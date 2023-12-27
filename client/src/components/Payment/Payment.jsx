import React, { useState } from "react";
import Paypal from "./PayPal";
import "../App.css";
import NavBar from "../NavBar";

function Payment (){

    const [checkout, setCheckOut] = useState(false);

    // Chamaths side

  // let orderId = 8;
  // sessionStorage.setItem("order_id",JSON.stringify(orderId));

  // let username = 8;
  // sessionStorage.setItem("username",JSON.stringify(username));

  // let thinalcart = ["Pizza,600,1","Pebbles,400,3","Lava Cake,200,2"];
  // sessionStorage.setItem("cart",JSON.stringify(thinalcart));


  // let total_amount = 10;
  // sessionStorage.setItem("total_amount",JSON.stringify(total_amount));


let OrderId = sessionStorage.getItem('order_id');
let Username = sessionStorage.getItem('username');
let Cart = sessionStorage.getItem('cart');
let Total_amount = sessionStorage.getItem('total');


  return (
  <>
  <NavBar></NavBar>
  <div>
    <style>
    {`
      body {
        margin: 0;
        padding: 0;
        background-image: url("/images/Background.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        color:white;
      }
    `}
    </style>
  <h1>Checkout</h1><br/>

  <h2>Order Id:</h2>
  <label>{OrderId}</label>

  <h2>Username:</h2>
  <label>{Username}</label>

  <h2>Items:</h2>
  <label>{Cart}</label>

  <h2>Total Amount:</h2>
  <label>{Total_amount}</label>

  
  <div className="pay-button">
  {checkout ? (
    <Paypal />
  ) : (
    <button   
      style={{ backgroundColor: 'green', color: 'white' }}
      onClick={() => {
        setCheckOut(true);
      }}
    >
      Payment
    </button>

  )  }
</div>
</div>
  </>
  );
}

export default Payment;
