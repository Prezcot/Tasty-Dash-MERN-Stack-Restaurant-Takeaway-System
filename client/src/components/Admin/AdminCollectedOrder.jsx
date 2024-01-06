import { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../BootstrapImports.js";
import axios from "axios";

const AdminCollectedOrder = () => {
  const [data, setData] = useState([]);
  const [search_query, setSearchQuery] = useState("");
  const [filtered_order_data, setFilteredOrderData] = useState([]);

  var grabData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/admin_dashboard_data/receive/order_collected_data"
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    grabData();
  }, []);

  useEffect(() => {
    setFilteredOrderData(
      data.filter(
        (item) =>
          item.username.toLowerCase().includes(search_query.toLowerCase()) ||
          item.order_id.toString().includes(search_query) ||
          item.email.toLowerCase().includes(search_query.toLowerCase())
      )
    );
  }, [search_query, data]);

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
        Collected Orders
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
        {filtered_order_data.map((items, index) => (
          <div key={index}>
            <li
              data-testid="list-item-test"
              className="list-group-item fs-6 list-group-item-info"
            >
              <b>Name: {items.username}</b>
              <br />
              <b>Order ID: {items.order_id}</b>
              <br />
              <b>Paypal Email: {items.paypal_email}</b>
              <br />
              <b>Order Total: {items.order_total}</b>
              <br />
              <hr style={{ margin: "10px" }} />
              <h4
                style={{
                  marginLeft: "50px",
                  marginTop: "10px",
                }}
              >
                Order Status: {items.order_status}
              </h4>
            </li>
            <div style={{ padding: "10px", backgroundColor: "" }} />
          </div>
        ))}
      </ul>
    </>
  );
};

export default AdminCollectedOrder;
