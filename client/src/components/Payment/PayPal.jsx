import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

function Paypal() {
  const paypal = useRef();
  const nav = useNavigate();
  let [latest_order_id, setLOID] = useState(0);

  async function notifySuccess() {
    toast.success("Your order has been placed", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClose: () => {
        nav("/orders");
      },
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  async function notifyFailure() {
    toast.error("order failed", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
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
                description: "Your Payment",
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
          let response = await axios.get(
            "http://localhost:3001/orders/get_order_id"
          );
          setLOID((latest_order_id = response.data));
          let temp = latest_order_id + 1;
          let order_details = {
            username: sessionStorage.getItem("username"),
            order_id: temp,
            payment_id: order.id,
            email: sessionStorage.getItem("email"),
            paypal_email: order.payer.email_address,
            items: JSON.parse(sessionStorage.getItem("cart")),
            order_status: "Pending",
            instructions: sessionStorage.getItem("customer_instruction"),
            order_total: sessionStorage.getItem("total"),
          };

          await axios.post(
            "http://localhost:3001/orders/addorder",
            order_details
          );

          let document_id =
            "659aab5891c6823058f07bd4"; /*this document does not change and is singular in the mongodb collection*/
          await axios.put(
            `http://localhost:3001/orders/update_order_id/${document_id}`,
            { temp }
          );

          const socket = io("http://localhost:3001");
          socket.emit("order_status_update", {
            username: order_details.username,
            status: order_details.order_status,
          });

          sessionStorage.removeItem("menu_cart");
          sessionStorage.removeItem("cart");
          sessionStorage.removeItem("order_id");
          sessionStorage.removeItem("total");
          sessionStorage.removeItem("customer_instruction");

          notifySuccess();
        },
        onError: (err) => {
          console.log(err);
          notifyFailure();
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
      <ToastContainer />
    </div>
  );
}

export default Paypal;
