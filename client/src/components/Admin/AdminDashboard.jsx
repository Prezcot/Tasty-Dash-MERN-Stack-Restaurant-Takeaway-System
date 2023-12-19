import { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const AdminDashboard = () => {
  const [order_data, set_order_data] = useState([]);

  useEffect(() => {
    let grabData = async () => {
      await axios
        .get("http://localhost:3001/admin_dashboard_data/receive/order_data")
        .then((res) => {
          set_order_data(res.data);
          console.log(order_data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    grabData();
  }, []);

  function displayProductItems(items) {
    let string = "";
    items.items.forEach((line) => {
      let [productName, quantity] = line.split(",");
      string += `${productName} : ${quantity}<br />`;
    });
    return string;
  }

  return (
    <>
      <AdminNavBar />
      <h1 className="display-6">Pending Orders</h1>
      <ul className="list-group">
        {order_data.map((items, index) => (
          <>
            <li key={index} className="list-group-item">
              Name: {items.username}
              <br />
              Email: {items.email}
              <br />
              Contact: {items.email}
              <br />
              {parse(displayProductItems(items))}
              <span class="d-flex mt-4">
                <button type="button" class="btn btn-success me-4 btn-lg">
                  <i class="bi bi-check">Approve</i>
                </button>
                <button type="button" class="btn btn-danger btn-lg">
                  <i class="bi bi-x">Decline</i>
                </button>
                <div className="ml-3">Order Status: </div>:
              </span>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default AdminDashboard;
