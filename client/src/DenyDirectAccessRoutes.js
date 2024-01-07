import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/User/SignUp";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Menu from "./components/Menu/Menu";
import Dashboard from "./components/User/Dashboard";
import AdminNavBar from "./components/Admin/AdminNavBar";
import Basket from "./components/Order/Basket";
import Payment from "./components/Payment/Payment";
import AdminItem from "./components/Admin/AdminItem";
import AdminMenu from "./components/Admin/AdminMenu";
import LiveOrders from "./components/Order/LiveOrders";
import Home from "./components/Home/Home";
import axios from "axios";
import { useState } from "react";
import HomeMenu from "./components/Home/HomeMenu";

function DenyDirectAccessRoutes() {
  var [isUser, setIsUser] = useState();
  const token = sessionStorage.getItem("token");
  async function checkUser() {
    if (sessionStorage.getItem("token")) {
      await axios
        .get(`http://localhost:3001/users/authentication`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.message == "User") {
            setIsUser(true);
          } else if (res.data.message == "Admin") {
            setIsUser(false);
          }
        })
        .catch((err) => console.log(err));
    }
    else{
      return <Navigate to="/home"></Navigate>;
    }
  }
  checkUser();
  if (!sessionStorage.getItem("username")) {
    return <Navigate to="/home"></Navigate>;
  }
  if (isUser) {
    return (
      <Routes>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route
          path="/payment"
          element={<Payment renderPayPal={true} />}
        ></Route>
        <Route path="/orders" element={<LiveOrders />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    );
  } else if (!isUser) {
    return (
      <Routes>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/admin" element={<AdminNavBar />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route
          path="/payment"
          element={<Payment renderPayPal={true} />}
        ></Route>
        <Route path="/orders" element={<LiveOrders />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    );
  }
}

export default DenyDirectAccessRoutes;
