import React, { useState, useEffect } from "react";
import Product from "./Product";
import SummaryItem from "./SummaryItem";
import "../App.css";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
function Basket() {

  let [latest_order_id,setLOID] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/orders/get_order_id")
      .then((response) => {
        console.log("this is the axios response"+response)
        setLOID(latest_order_id=response.data);
        console.log("order_id from mongo:"+response.data);
        console.log("setter value:"+latest_order_id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const nav = useNavigate();
  let instructionfromcust = "";

  // Thinals side
  // let thinalcart = ["Pizza,600,1","Pebbles,400,3","Lava Cake,200,2"];
  // sessionStorage.setItem("cart",JSON.stringify(thinalcart));
  let quantityMap = JSON.parse(sessionStorage.getItem("menuCart"));
  // my side
  let cart = JSON.parse(sessionStorage.getItem("cart"));

  // state for summary
  let [updatedqty, setUpdatedQty] = useState(false);

  // TO trigger the order summary update
  function UpdateSummary() {
    setUpdatedQty((previousval) => !previousval);
  }

  // To collect the instruction provided
  function setInstructions(e) {
    instructionfromcust = e.target.value;
    console.log("instruction received: " + instructionfromcust);
  }

  let [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    // Calculate the total when cart changes
    let total = cart.reduce((acc, item) => {
      let [name, price, quantity] = item.split(",");
      return acc + parseInt(price * quantity);
    }, 0);

    setFinalTotal(total);
  }, [cart]);

  //sending order data to mongo
  async function handleOrder() {
    let temp = latest_order_id+1;
    console.log("temp varaible is:"+temp);

    let orderDetails = {
      username: sessionStorage.getItem("username"),
      order_id: temp,
      payment_id: "PAYMENT PENDING!",
      email: sessionStorage.getItem("email"),
      items: cart,
      order_status: "Pending",
      instructions: instructionfromcust,
      order_total: finalTotal,
    };

    await axios.post("http://localhost:3001/orders/addorder", orderDetails);

    let document_id = '6589770129060833d3f653b1';
    await axios.put(`http://localhost:3001/orders/update_order_id/${document_id}`, {temp});
    sessionStorage.setItem("order_id", JSON.stringify(orderDetails.order_id))
  }
  
  return (
    <>
    <div className="everything">
    <style>
    {`
      body {
        margin: 0;
        padding: 0;
        background-image: url("/images/MenuBackground.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
      }
      
    `}
  </style>
        <NavBar/>
        <div className="header">
          <h1 className="title">Your Basket</h1>
          <div id="tomenu">
            <img id="arrow" src="/images/Arrow.png" width="50px" height="15px" />
            <button id="menu-button" onClick={()=>nav("/menu")} style={{backgroundColor:"#121212", borderRadius:"10px", border:"solid 3px #d9d9d9"}}>Back to Menu</button>
          </div>
        </div>
  
        <div className="basketcontainer">
          <div className="basket">
            <div className="confirm">
              <h3 className="textcolor">Confirm your order</h3>
              {cart.map((item, index) => (
                <Product 
                itemProp={item} 
                indexProp={index}
                cartProp={cart} 
                quantityProp={quantityMap}
                updateProp={() => UpdateSummary()}
                
                />
              ))}
  
              <div className="instruction">
                <h3 className="textcolor">Special Instructions for Preparation</h3>
                <textarea className="textarea" onChange={setInstructions}></textarea>
              </div>
            </div>
  
            <div className="summary">
              <h2 className="textcolor">Order Summary</h2>
              {cart.map((item, index) => (
                <SummaryItem itemProp2={item} indexProp2={index} cartProp2={cart}/>
              ))}
              <div className="finalize">
                <div id="indi-detail">
                  <p className="textcolor">Total</p>
                  <p className="textcolor">Rs.{finalTotal}</p>
                </div>
                <button id="payment-button" onClick={handleOrder}><b>Proceed to Payment</b></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Basket;
