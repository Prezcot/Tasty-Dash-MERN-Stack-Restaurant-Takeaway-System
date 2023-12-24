import { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import parse from "html-react-parser";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
if (process.env.NODE_ENV !== 'test') {
  require("bootstrap/dist/css/bootstrap.min.css");
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}
import axios from "axios";
import { io } from "socket.io-client";

const AdminDashboard = () => {
  const [order_data, set_order_data] = useState([]);

  var grabData = async () => {
    await axios
      .get("http://localhost:3001/admin_dashboard_data/receive/order_data")
      .then((res) => {
        set_order_data(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    grabData();
    const socket = io("http://localhost:3001");
    socket.on("order_status_update", () => {
      grabData();
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const displayProductItems = (items) => {
    let string = "";
    items.items.forEach((line) => {
      let [productName, unitPrice, quantity] = line.split(",");
      string += `${productName} : ${quantity}<br />`;
    });
    return string;
  };

  const updateOrderStatus = async (order_id, new_status) => {
    console.log(order_id);

    await axios
      .put("http://localhost:3001/admin_dashboard_data/set_order_status", {
        order_id: order_id,
        order_status: new_status,
      })
      .then((res) => {
        console.log(res);
        const socket = io("http://localhost:3001/");
        socket.emit("order_status_update");
        grabData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sortedOrderData = [...order_data].sort((a, b) => {
    const orderStatusOrder = {
      Pending: 0,
      Approved: 1,
      "Order Collected": 2,
    };
    const orderStatusA = orderStatusOrder[a.order_status];
    const orderStatusB = orderStatusOrder[b.order_status];

    if (orderStatusA < orderStatusB) {
      return -1;
    } else if (orderStatusA > orderStatusB) {
      return 1;
    } else return 0;
  });

  return (
    <>
      <h1 className="display-6" style={{ paddingTop: "60px" }}>
        Pending Orders
      </h1>
      <ul className="list-group">
        {sortedOrderData.map((items, index) => (
          <div key={index}>
            <li
              className={`list-group-item fs-6 ${
                items.order_status === "Approved"
                  ? "list-group-item-success"
                  : items.order_status === "Declined"
                  ? "list-group-item-danger"
                  : items.order_status === "Order Collected"
                  ? "list-group-item-dark"
                  : "list-group-item-warning"
              }`}
            >
              Name: {items.username}
              <br />
              Email: {items.email}
              <br />
              Contact: {items.email}
              <br />
              Additional Instructions:{" "}
              <span className="text-info">
                <b>{items.instructions}</b>
              </span>
              <br />
              <div className="text-muted">
                {parse(displayProductItems(items))}
              </div>
              <b>Order Total: {items.order_total}</b>
              <br />
              <span className="d-flex mt-3">
                <button
                  type="button"
                  className="btn btn-success me-4 btn-lg"
                  onClick={() => updateOrderStatus(items._id, "Approved")}
                >
                  <i className="bi bi-check">Approve</i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger me-4 btn-lg"
                  onClick={() => updateOrderStatus(items._id, "Declined")}
                >
                  <i className="bi bi-x">Decline</i>
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn-lg"
                  onClick={() =>
                    updateOrderStatus(items._id, "Order Collected")
                  }
                >
                  <i>Order Collected</i>
                </button>
                <h4
                  style={{
                    marginLeft: "50px",
                    marginTop: "10px",
                  }}
                >
                  Order Status: {items.order_status}
                </h4>
              </span>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default AdminDashboard;
