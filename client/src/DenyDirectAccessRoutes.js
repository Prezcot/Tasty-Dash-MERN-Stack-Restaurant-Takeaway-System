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

function DenyDirectAccessRoutes() {
  var isLoggedIn = false;
  if (sessionStorage.getItem("username")) {
    isLoggedIn = true;
  }
  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/admin" element={<AdminNavBar />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/payment" element={<Payment renderPayPal = {true} />}></Route>
        <Route path="/orders" element={<LiveOrders />}></Route>
      </Routes>
    );
  } else {
    return <Navigate to="/home" replace></Navigate>;
  }
}

export default DenyDirectAccessRoutes;
