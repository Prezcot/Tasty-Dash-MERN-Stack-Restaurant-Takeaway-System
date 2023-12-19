import { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import ReactHtmlParser from "react-html-parser";
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
    return { __html: string };
  }

  return (
    <>
      <AdminNavBar />
      <h1 className="display-6">Pending Orders</h1>
      <ul className="list-group">
        <li className="list-group-item">Testing1</li>
        <li className="list-group-item">Testing2</li>
        {order_data.map((items) => (
          <>
            <li className="list-group-item">
              {items.username}
              <br />
              {items.email}
              <br />
              <div dangerouslySetInnerHTML={displayProductItems(items)}></div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default AdminDashboard;
