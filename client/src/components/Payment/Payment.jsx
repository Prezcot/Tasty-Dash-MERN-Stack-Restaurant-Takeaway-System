import React, { useState } from "react";
import Paypal from "./PayPal";
import "../App.css";
import NavBar from "../NavBar";

function Payment (){

    const [checkout, setCheckOut] = useState(false);

let OrderId = sessionStorage.getItem('order_id');
let Username = sessionStorage.getItem('username');
let Cart = sessionStorage.getItem('cart');
let Total_amount = sessionStorage.getItem('total');


  return (
  <>
  <div className="everything">
  <NavBar></NavBar>
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
  <h1 style={{marginTop:"3%", marginLeft:"10%"}}>Checkout</h1><br/>
  
  <div className="payment-detail-button-container">

  <div style={{display:"flex", flexDirection:"column",justifyContent:"space-around", height:"50vh"}}>
  <div>
      <h2>Username:</h2>
      <h5 style={{ fontWeight: 'normal' }}>{Username}</h5>
    </div>

    <div>
      <h2>Items:</h2>
      <h5 style={{ fontWeight: 'normal' }}>{Cart}</h5>
    </div>

    <div>
      <h2>Total Amount:</h2>
      <h5 style={{ fontWeight: 'normal' }}>${Total_amount}</h5>
    </div>

  </div>


  <div className="pay-button">
    <Paypal />
  </div>  
</div>
</div>
  </>
  );
}

export default Payment;
