import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { io } from "socket.io-client";

function LiveOrders() {
  let [orderInfo, setOrderInfo] = useState([]);
  let [cancelConfirmation, setCancelConfirmation] = useState(null);
  

  function handleCancelOrder (orderId) {
    setCancelConfirmation(orderId);
  };

  async function handleYes(orderId) {
    await axios.delete(`http://localhost:3001/orders/cancel_order/${orderId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

  };

  function handleNo () {
    setCancelConfirmation(null);
  }

  function fetchOrders() {
    axios
      .post("http://localhost:3001/orders/your_orders", {
        user: sessionStorage.getItem("username"),
      })
      .then((response) => {
        setOrderInfo(response.data);
        console.log(orderInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  useEffect(() => {
      fetchOrders();
      const socket = io("http://localhost:3001");
      socket.on("order_status_update", () => {
        fetchOrders();
      });
      return () => {
        socket.disconnect();
      };
  },[]); 

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
        <NavBar />
        <div className="ordermaincontainer">

          <div className="header">
            <h1>Your Orders</h1>
          </div>
          
          <div className="live_orders">
            <h3>Live Orders</h3>
          </div>
          {orderInfo.map((orders) => (
            orders.order_status !== "Collected" && (
              <div className="live-order-items">
            {cancelConfirmation === orders.order_id ? (
              <div className="cancel-confirmation" style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
                <p>Are you sure you want to cancel this order?</p>
                <div>
                  <button onClick={() => handleYes(orders.order_id)} style={{marginRight:"10px", backgroundColor:"red"}}>Yes</button>
                  <button onClick={handleNo} style={{marginLeft:"10px",backgroundColor:"lightgray", color:"black"}}>No</button>
                </div>
              </div>
            ) : (
                <div className="indi-order" style={{alignItems:"center"}}>
                  <div>
                    <b>
                      <label>Order ID</label>
                    </b>
                    <br />
                    <label>{orders.order_id}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Status</label>
                    </b>
                    <br />
                    <label>{orders.order_status}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Total</label>
                    </b>
                    <br />
                    <label>{orders.order_total}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Items</label>
                    </b>
                    <br />
                    {orders.items.map((item, index) => {
                      let [name, price, quantity] = item.split(",");
                      return (
                        <>
                          <label>{name} (x{quantity})</label>
                          <br />
                        </>
                      );
                    })}
                  </div>
                  <div>
                    <button style={{backgroundColor:"red"}}  onClick={() => handleCancelOrder(orders.order_id)}> Cancel Order</button>
                  </div>
                </div>
            )}
              </div>
            )
          ))}

            <div className="order_history">
            <h3>Order History</h3>
            </div>
            {orderInfo.map((orders) => (
            orders.order_status === "Collected" && (
              <div className="order-history-items">
                <div className="indi-order" style={{alignItems:"center"}}>
                  <div>
                    <b>
                      <label>Order ID</label>
                    </b>
                    <br />
                    <label>{orders.order_id}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Status</label>
                    </b>
                    <br />
                    <label>{orders.order_status}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Total</label>
                    </b>
                    <br />
                    <label>{orders.order_total}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Items</label>
                    </b>
                    <br />
                    {orders.items.map((item, index) => {
                      let [name, price, quantity] = item.split(",");
                      return (
                        <>
                          <label>{name} (x{quantity})</label>
                          <br />
                        </>
                      );
                    })}
                  </div>
                  <div>
                    <button style={{color:"black"}}>Cancel Order</button>
                  </div>
                </div>
              </div>
            )
          ))}   
        </div>
      </div>
    </>
  );
}

export default LiveOrders;
