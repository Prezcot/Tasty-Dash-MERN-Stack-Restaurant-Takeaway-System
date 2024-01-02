import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { io } from "socket.io-client";

function LiveOrders() {
  let [liveOrderInfo, setLiveOrderInfo] = useState([]);
  let [orderHistoryInfo, setOrderHistoryInfo] = useState([]);

  async function fetchOrders() {
    try{
      let response = await axios.post("http://localhost:3001/orders/your_orders", {user: sessionStorage.getItem("username"),})
      setLiveOrderInfo(response.data.liveOrderItems);
      setOrderHistoryInfo(response.data.orderHistoryItems)

    } catch (error){
      console.error(error);
    }
  }
  
  useEffect(() => {
      fetchOrders();
      const socket = io("http://localhost:3001");
      socket.on("order_status_update", (username) => {
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
          {liveOrderInfo.length > 0 ? (
          liveOrderInfo.map((orders) => (
              <div className="live-order-items">
                <div className="indi-order" style={{alignItems:"center"}}>

                  <div>
                    <b>
                      <label>Order ID</label>
                    </b>
                    <br />
                    <label style={{color:"white"}} data-testid="rendered-live-order-id-test">{orders.order_id}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Status</label>
                    </b>
                    <br />
                    <label style={{color:"orange"}} data-testid="live-order-item">{orders.order_status}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Total</label>
                    </b>
                    <br />
                    <label style={{color:"white"}}>${orders.order_total}</label>
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
                          <label style={{color:"white"}}>- {name} (x{quantity})</label>
                          <br />
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
          ))
          ) : (
            <label style={{color:"#F85606", paddingLeft:"1%"}}>No live orders to display.</label>
            )}


            <div className="order_history">
            <h3>Order History</h3>
            </div>
            {orderHistoryInfo.length > 0 ? (
            orderHistoryInfo.map((orders) => (
              <div className="order-history-items">
                <div className="indi-order" style={{alignItems:"center"}}>
                  <div>
                    <b>
                      <label>Order ID</label>
                    </b>
                    <br />
                    <label data-testid="rendered-order-history-id-test">{orders.order_id}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Status</label>
                    </b>
                    <br />
                    <label data-testid="order-history-item">{orders.order_status}</label>
                  </div>

                  <div>
                    <b>
                      <label>Order Total</label>
                    </b>
                    <br />
                    <label>${orders.order_total}</label>
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
                </div>
              </div>
          ))
          ) : (
            <label style={{color:"#F85606", paddingLeft:"1%"}}>No past orders to display.</label>
          )}
        </div>
      </div>
      
    </>
  );
}

export default LiveOrders;