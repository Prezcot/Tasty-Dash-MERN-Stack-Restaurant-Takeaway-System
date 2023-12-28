import SignIn from "./components/User/SignIn";
import React, { useState, useEffect } from "react";
import SignUp from "./components/User/SignUp";
import {Routes, Route} from 'react-router-dom';
import DenyDirectAccessRoutes from "./DenyDirectAccessRoutes";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate();
  
  async function notify(username) {
    if(sessionStorage.getItem("username")==username){
      toast.info("Your Order Status Has Been Updated!", {
        position: "top-center",
        autoClose: 5000,
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
      let value1 = data.username
      console.log("this from app.js "+ value1);
      notify(value1);
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
