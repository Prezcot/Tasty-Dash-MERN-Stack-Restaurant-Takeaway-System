import { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import parse from "html-react-parser";
import "../../BootstrapImports.js";
import axios from "axios";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [order_data, setOrderData] = useState([]);
  const [search_query, setSearchQuery] = useState("");
  const [filtered_order_data, setFilteredOrderData] = useState([]);

  var grabData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/admin_dashboard_data/receive/order_data"
      );
      setOrderData(res.data);
      setFilteredOrderData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sorted_order_data = [...filtered_order_data].sort((a, b) => {
    const order_status_order = {
      Pending: 0,
      Approved: 1,
      Collected: 2,
      Declined: 3,
    };
    const order_status_a = order_status_order[a.order_status];
    const order_status_b = order_status_order[b.order_status];

    if (order_status_a !== order_status_b) {
      return order_status_a - order_status_b;
    } else if (a.order_status === "Pending") {
      return a.order_id - b.order_id;
    } else {
      return 0;
    }
  });

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

  useEffect(() => {
    setFilteredOrderData(
      order_data.filter(
        (item) =>
          item.username.toLowerCase().includes(search_query.toLowerCase()) ||
          item.order_id.toString().includes(search_query) ||
          item.email.toLowerCase().includes(search_query.toLowerCase())
      )
    );
  }, [search_query, order_data]);

  const displayProductItems = (items) => {
    let string = "";
    items.items.forEach((line) => {
      let [product_name, unit_price, quantity] = line.split(",");
      string += `<li>${product_name} : ${quantity}</li>`;
    });
    return string;
  };

  const updateOrderStatus = async (object_id, new_status, username) => {
    console.log("updated order status function");
    toast.info("The Order Status Has Been Updated!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    if (new_status === "Declined") {
      console.log("Object ID of Declined: ", object_id);
      try {
        console.log(object_id);
        await axios.post(
          "http://localhost:3001/admin_dashboard_data/move_to_refund",
          { object_id: object_id }
        );
        const socket = io("http://localhost:3001");
        socket.emit("order_status_update", {
          username: username,
          status: new_status,
        });
        grabData();
      } catch (err) {
        console.log(err);
      }
    } else if (new_status === "Collected") {
      console.log("Object ID of Collected: ", object_id);
      try {
        console.log(object_id);
        await axios.post(
          "http://localhost:3001/admin_dashboard_data/move_to_collected_orders",
          { object_id: object_id }
        );
        const socket = io("http://localhost:3001");
        socket.emit("order_status_update", {
          username: username,
          status: new_status,
        });
        grabData();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Object ID: ", object_id);

      try {
        await axios.put(
          "http://localhost:3001/admin_dashboard_data/set_order_status",
          {
            object_id: object_id,
            order_status: new_status,
          }
        );

        const socket = io("http://localhost:3001");
        socket.emit("order_status_update", {
          username: username,
          status: new_status,
        });
        grabData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div
        className="display-6 text-light d-flex justify-content-between align-items-center"
        style={{
          paddingLeft: "9px",
          paddingTop: "70px",
          paddingBottom: "5px",
          backgroundColor: "#666666",
        }}
      >
        Pending Orders
        <span style={{ paddingTop: "5px", paddingRight: "5px" }}>
          <input
            value={search_query}
            style={{
              borderRadius: "10px",
            }}
            type="search"
            placeholder="Search Order"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </span>
      </div>
      <ul className="list-group">
        {sorted_order_data.map((items, index) => (
          <div key={index}>
            <li
              data-testid="list-item-test"
              className={`list-group-item fs-6 ${
                items.order_status === "Approved"
                  ? "list-group-item-success"
                  : "list-group-item-warning"
              }`}
            >
              Name: {items.username}
              <br />
              Order ID: {items.order_id}
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
              <hr style={{ margin: "10px" }} />
              Order List:
              <ol className="text-body-tertiary">
                {parse(displayProductItems(items))}
              </ol>
              <b>Order Total: {items.order_total}</b>
              <br />
              <hr style={{ margin: "10px" }} />
              <span className="d-flex mt-3">
                {items.order_status === "Pending" && (
                  <>
                    <button
                      type="button"
                      className="btn btn-success me-4 btn-lg"
                      onClick={() => updateOrderStatus(items._id, "Approved",items.username)}
                      data-testid="Approve"
                    >
                      <i className="bi bi-check">Approve</i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger me-4 btn-lg"
                      onClick={() => updateOrderStatus(items._id, "Declined",items.username)}
                      data-testid="Decline"
                    >
                      <i className="bi bi-x">Decline</i>
                    </button>
                  </>
                )}
                {items.order_status === "Approved" && (
                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    onClick={() => updateOrderStatus(items._id, "Collected",items.username)}
                    data-testid="Collected"
                  >
                    <i>Order Collected</i>
                  </button>
                )}
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
            <div style={{ padding: "10px", backgroundColor: "" }} />
          </div>
        ))}
      </ul>
    </>
  );
};

export default AdminDashboard;
