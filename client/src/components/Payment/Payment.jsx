import React, { useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import Paypal from "./PayPal";
import "../App.css";
import NavBar from "../NavBar";

function Payment({ renderPayPal = true }) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let total_amount = sessionStorage.getItem("total");
  let customer_ins = sessionStorage.getItem("customer_instruction");
  const nav=useNavigate();
  if (!sessionStorage.getItem("total")) {
    return(
      <>
      <Navigate to="/orders"></Navigate>;
      </>
    );
  }
  else{
    return (
      <>
        <div className="everything" style={{ paddingTop: "4%" }}>
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
          <h1 style={{ marginTop: "3%", marginLeft: "10%", color: "#FFF" }}>
            Confirm Details and Checkout
          </h1>
          <br />

          <div
            className="payment-detail-button-container"
            style={{ marginBottom: "10%", height: "fit-content" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "fit-content",
                borderRight: "7px solid orange",
                padding: "3%",
                paddingLeft: "3%",
                paddingRight: "17%",
              }}
            >
              <div>
                <h3>Items Ordered</h3>
                {cart.map((item, index) => {
                  let [name, price, quantity] = item.split(",");
                  return (
                    <h6
                      data-testid="payment-items-test"
                      style={{ fontWeight: "normal" }}
                    >
                      - {name} (x{quantity})
                    </h6>
                  );
                })}
              </div>
              <br />

              <div>
                <h3>Special Instructions</h3>
                <h6
                  data-testid="payment-instruction-test"
                  style={{ fontWeight: "normal" }}
                >
                  {" "}
                  "{customer_ins}"
                </h6>
              </div>
              <br />

              <div>
                <h3>Total Amount</h3>
                <h5
                  data-testid="payment-total-test"
                  style={{ fontWeight: "normal", color: "orange" }}
                >
                  {" "}
                  ${total_amount}
                </h5>
              </div>
            </div>

            <div className="pay-button">{renderPayPal && <Paypal />}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Payment;
