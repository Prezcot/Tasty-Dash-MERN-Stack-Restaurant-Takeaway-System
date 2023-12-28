import SignIn from "./components/User/SignIn";
import React, { useState, useEffect } from "react";
import SignUp from "./components/User/SignUp";
import {Routes, Route} from 'react-router-dom';
import DenyDirectAccessRoutes from "./DenyDirectAccessRoutes";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  async function notify() {
    if(sessionStorage.getItem("type")=="User"){
      toast.success("Your Order Status Has Been Updated!", {
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
        },
      });
    }
    
  }
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("order_status_update", () => {
      notify();
    });
    return () => {
      socket.disconnect();
    };
},[]); 
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="*"
          element={
            <DenyDirectAccessRoutes />
          }
        />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
