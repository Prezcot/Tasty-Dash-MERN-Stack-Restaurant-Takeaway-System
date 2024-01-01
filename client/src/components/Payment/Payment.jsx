import React, { useState } from "react";
import Paypal from "./PayPal";
import "../App.css";
import NavBar from "../NavBar";

function Payment ({ renderPayPal = true }){

const [checkout, setCheckOut] = useState(false);

let Username = sessionStorage.getItem('username');
let Cart = JSON.parse(sessionStorage.getItem('cart')) || [];
let Total_amount = sessionStorage.getItem('total');
let CustomerIns = sessionStorage.getItem('customer_instruction');


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
  <h1 style={{marginTop:"3%", marginLeft:"10%", color:"#FFF"}}>Checkout</h1><br/>
  
  <div className="payment-detail-button-container" style={{marginBottom:"10%"}}>

  <div style={{display:"flex", flexDirection:"column",justifyContent:"space-around", height:"50vh",borderRight:"3px solid orange", padding:"10%", paddingLeft:"3%", paddingRight:"17%"}}>
  {/* <div>
      <h3>Username:</h3>
      <h6 data-testid="payment-username-test" style={{ fontWeight: 'normal' }}>{Username}</h6>
    </div> */}

    <div>
      <h3>Items Ordered</h3>
      {Cart.map((item, index) => {
      let [name, price, quantity] = item.split(",");
      return (
      <h6 data-testid="payment-items-test" style={{ fontWeight: 'normal' }}>- {name} (x{quantity})</h6>
      )})}
    </div><br/>

    <div>
      <h3>Special Instructions</h3>
      <h6 data-testid="payment-instruction-test" style={{ fontWeight: 'normal' }}> "{CustomerIns}"</h6>
    </div><br/>

    <div>
      <h3>Total Amount</h3>
      <h5 data-testid="payment-total-test" style={{ fontWeight: 'normal', color:"orange"}}> ${Total_amount}</h5>
    </div>

  </div>


  <div className="pay-button">
  {renderPayPal && <Paypal />}
  </div>  
</div>
</div>
  </>
  );
}

export default Payment;
