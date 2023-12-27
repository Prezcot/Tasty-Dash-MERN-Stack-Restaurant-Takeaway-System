import React, { useRef, useEffect } from "react";
import {useNavigate } from 'react-router-dom';

export default function Paypal() {
  const paypal = useRef();
  const nav = useNavigate();

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
          sessionStorage.removeItem("menuCart");
          sessionStorage.removeItem("cart");
          sessionStorage.removeItem("order_id");
          sessionStorage.removeItem("total");
          nav("/menu");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
      
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}