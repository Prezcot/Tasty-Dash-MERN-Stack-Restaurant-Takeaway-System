import SignIn from "./components/User/SignIn";
import React, { useState, useEffect } from "react";
import SignUp from "./components/User/SignUp";
import {Routes, Route} from 'react-router-dom';
import DenyDirectAccessRoutes from "./DenyDirectAccessRoutes";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate } from 'react-router-dom';
import Home from "./components/Home/Home";

function App() {
  const nav = useNavigate();
  
  async function notify(data) {
    if((sessionStorage.getItem("username")==data.username) && (data.status !== 'Pending')){
      toast.info("Your Order Status Has Been Updated!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClick: function() { 
          nav("/orders");
      }
        });
    }
    
  }
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("order_status_update", function(data) {
      console.log(''+data.status);
      notify(data);
    });
    return () => {
      socket.disconnect();
    };
},[]); 
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
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
