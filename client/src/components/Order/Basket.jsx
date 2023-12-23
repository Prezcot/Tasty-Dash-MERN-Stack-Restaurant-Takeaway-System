import React, { useState, useEffect } from "react";
import Product from "./Product";
import SummaryItem from "./SummaryItem";
import "../App.css";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
function Basket() {
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
    let orderDetails = {
      username: sessionStorage.getItem("username"),
      order_id: "5",
      payment_id: "68464",
      email: "chami@gmail.com",
      items: cart,
      order_status: "Pending",
      instructions: instructionfromcust,
      order_total: finalTotal,
    };

    await axios.post("http://localhost:3001/orders/addorder", orderDetails);
  }
  
  return (
    <>
    <div className="everything">
        <NavBar/>
        <div className="header">
          <h1 className="title">Your Basket</h1>
          <div id="tomenu">
            <img id="arrow" src="/images/Arrow.png" width="50px" height="15px" />
            <button id="menu-button" onClick={()=>nav("/menu")}>Back to Menu</button>
          </div>
        </div>
  
        <div className="basketcontainer">
          <div className="basket">
            <div className="confirm">
              <h2 className="textcolor">Confirm your order</h2>
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
