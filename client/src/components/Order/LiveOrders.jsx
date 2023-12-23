import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
function LiveOrders() {
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
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
  });

  return (
    <>
      <div className="everything">
        <NavBar></NavBar>
        <div className="ordermaincontainer">
          <div className="header">
            <h1>Your Orders</h1>
          </div>

          {orderInfo.map((orders) => (
            <div className="orderitems">
              <div className="indi-order">
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
                  <br/>
                  {orders.items.map((item) => {
                    let [name, price, quantity] = item.split(",")
                    return(
                        <>
                        <label>{name} (x{quantity})</label>
                        <br/>
                        </>)             
                    })}
                </div>

                <div>
                  <button>Cancel Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LiveOrders;
