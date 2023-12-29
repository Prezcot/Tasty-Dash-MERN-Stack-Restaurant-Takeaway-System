import React, { useState, useEffect } from "react";
import Product from "./Product";
import SummaryItem from "./SummaryItem";
import "../App.css";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  let [finalTotal, setFinalTotal] = useState(0.0);

  useEffect(() => {
    // Calculate the total when cart changes
    let total = cart.reduce((acc, item) => {
      let [name, price, quantity] = item.split(",");
      let latest_total = acc +  parseFloat((price * quantity).toFixed(2))
      sessionStorage.setItem("total", latest_total);
      return latest_total;
    }, 0);

    setFinalTotal(total.toFixed(2));
  }, [cart]);

  //sending order data to mongo
  async function handleOrder() {
    if(finalTotal>0){

      let finalcart = cart.filter((item) => {
        const [, , quantity] = item.split(",");
        return parseInt(quantity) > 0;});
      sessionStorage.setItem("cart", JSON.stringify(finalcart))

      sessionStorage.setItem("customer_instruction", instructionfromcust);
      
      nav("/payment");
      
    } else {
      toast.warning("Basket is empty", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
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
            <button id="menu-button" data-testid="back-to-menu-test" onClick={()=>nav("/menu")} style={{backgroundColor:"#121212", borderRadius:"10px", border:"solid 3px #d9d9d9"}}>Back to Menu</button>
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
                <textarea className="textarea" data-testid="spe-ins-test-comp" onChange={setInstructions}></textarea>
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
                  <p className="textcolor" data-testid="order-total-test">${finalTotal}</p>
                </div>
                <button id="payment-button" data-testid="payment-button-test" onClick={handleOrder}><b>Proceed to Payment</b></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Basket;