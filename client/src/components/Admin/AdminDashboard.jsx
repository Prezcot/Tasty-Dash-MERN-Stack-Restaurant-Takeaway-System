import { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

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
  }, []);

  const display_product_items = (items) => {
    let string = "";
    items.items.forEach((line) => {
      let [productName, quantity] = line.split(",");
      string += `${productName} : ${quantity}<br />`;
    });
    return string;
  };

  const update_order_status = async (order_id, new_status) => {
    console.log(order_id);

    await axios
      .put("http://localhost:3001/admin_dashboard_data/set_order_status", {
        order_id: order_id,
        order_status: new_status,
      })
      .then((res) => {
        console.log(res);
        grabData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {/* <AdminNavBar /> */}
      <h1 className="display-6">Pending Orders</h1>
      <ul className="list-group">
        {order_data.map((items, index) => (
          <div key={index}>
            <li
              className={`list-group-item fs-5 ${
                items.order_status === "Approved"
                  ? "list-group-item-success"
                  : items.order_status === "Declined"
                  ? "list-group-item-danger"
                  : "list-group-item-warning"
              }`}
            >
              Name: {items.username}
              <br />
              Email: {items.email}
              <br />
              Contact: {items.email}
              <br />
              {parse(display_product_items(items))}
              <span className="d-flex mt-3">
                <button
                  type="button"
                  className="btn btn-success me-4 btn-lg"
                  onClick={() => update_order_status(items._id, "Approved")}
                >
                  <i className="bi bi-check">Approve</i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => update_order_status(items._id, "Declined")}
                >
                  <i className="bi bi-x">Decline</i>
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
