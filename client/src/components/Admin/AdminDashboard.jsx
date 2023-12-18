import { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";

const AdminDashboard = async () => {
  const [order_data, set_order_data] = useState([]);

  return (
    <>
      <AdminNavBar />
      <h1 className="display-6">Pending Orders</h1>
      <ul className="list-group">
        <li className="list-group-item">Testing1</li>
        <li className="list-group-item">Testing2</li>
      </ul>
    </>
  );
};

export default AdminDashboard;
