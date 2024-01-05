import { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../BootstrapImports.js";
import axios from "axios";

const AdminOrderRefund = () => {
  const [data, setData] = useState([]);

  var grabData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/admin_dashboard_data/receive/refund_data"
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    grabData();
  }, []);

  return (
    <>
      <div
        className="display-6 text-light"
        style={{
          paddingLeft: "9px",
          paddingTop: "76px",
          paddingBottom: "10px",
          margin: "0px",
          backgroundColor: "#666666",
        }}
      >
        Refunds Necessary
      </div>
      <ul className="list-group">
        {data.map((items, index) => (
          <div key={index}>
            <li
              data-testid="list-item-test"
              className="list-group-item fs-6 list-group-item-danger"
            >
              <b>Name: {items.username}</b>
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

export default AdminOrderRefund;
