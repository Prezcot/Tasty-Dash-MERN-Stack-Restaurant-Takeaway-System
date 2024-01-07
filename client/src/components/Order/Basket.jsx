import React, { useState, useEffect } from "react";
import Product from "./Product";
import SummaryItem from "./SummaryItem";
import "../App.css";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Basket() {
  const nav = useNavigate();
  let [instruction_from_cust, setInstructionFromCust] = useState(
    sessionStorage.getItem("customer_instruction") || ""
  );

  let quantity_map = JSON.parse(sessionStorage.getItem("menu_cart"));

  let cart = JSON.parse(sessionStorage.getItem("cart"));

  // state for summary
  let [updated_qty, setUpdatedQty] = useState(false);

  // TO trigger the order summary update
  function UpdateSummary() {
    setUpdatedQty((previousval) => !previousval);
  }

  // To collect the instruction provided
  function setInstructions(e) {
    let existing_instruction = sessionStorage.getItem("customer_instruction");
    let default_value = existing_instruction ? existing_instruction : "";
    setInstructionFromCust(e.target.value);
    console.log("instruction received: " + instruction_from_cust);
  }

  let [final_total, setFinalTotal] = useState(0.0);

  useEffect(() => {
    // Calculate the total when cart changes
    let total = cart.reduce((acc, item) => {
      let [name, price, quantity] = item.split(",");
      let latest_total = acc + parseFloat((price * quantity).toFixed(2));
      sessionStorage.setItem("total", latest_total.toFixed(2));
      return latest_total;
    }, 0);

    setFinalTotal(total.toFixed(2));
  }, [cart]);

  //sending order data to mongo
  async function handleOrder() {
    if (final_total > 0) {
      let final_cart = cart.filter((item) => {
        const [, , quantity] = item.split(",");
        return parseInt(quantity) > 0;
      });
      sessionStorage.setItem("cart", JSON.stringify(final_cart));

      sessionStorage.setItem("customer_instruction", instruction_from_cust);

      nav("/payment");
    } else {
      toast.warning("Basket is empty", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <>
      <div className="everything" style={{ paddingTop: "4%" }}>
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
        <NavBar />
        <div className="header">
          <h1 className="title">Your Basket</h1>
          <div id="tomenu">
            <img
              id="arrow"
              src="/images/Arrow.png"
              width="50px"
              height="15px"
            />
            <button
              id="menu-button"
              data-testid="back-to-menu-test"
              onClick={() => nav("/menu")}
              style={{
                backgroundColor: "#121212",
                borderRadius: "10px",
                border: "solid 3px #d9d9d9",
              }}
            >
              Back to Menu
            </button>
          </div>
        </div>

        <div className="basketcontainer">
          <div className="basket">
            <div className="confirm">
              <h3 className="textcolor">Confirm your order</h3>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <Product
                    item_prop={item}
                    index_prop={index}
                    cart_prop={cart}
                    quantity_prop={quantity_map}
                    update_prop={() => UpdateSummary()}
                  />
                ))
              ) : (
                <label style={{ color: "#F85606" }}>
                  No products in your basket.
                </label>
              )}

              <div className="instruction">
                <h3 className="textcolor">
                  Special Instructions for Preparation
                </h3>
                <textarea
                  value={instruction_from_cust}
                  className="textarea"
                  data-testid="spe-ins-test-comp"
                  onChange={setInstructions}
                ></textarea>
              </div>
            </div>

            <div className="summary">
              <h2 className="textcolor">Order Summary</h2>
              {cart.map((item, index) => (
                <SummaryItem
                  item_prop2={item}
                  index_prop2={index}
                  cart_prop2={cart}
                />
              ))}
              <div className="finalize">
                <div id="indi-detail">
                  <p className="textcolor">Total</p>
                  <p className="textcolor" data-testid="order-total-test">
                    ${final_total}
                  </p>
                </div>
                <button
                  id="payment-button"
                  data-testid="payment-button-test"
                  onClick={handleOrder}
                >
                  <b>Proceed to Payment</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Basket;
