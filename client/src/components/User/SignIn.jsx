import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SignUp from "./SignUp";
import AdminDashboard from "../Admin/AdminDashboard";
import Menu from "../Menu/Menu";
import Dashboard from "./Dashboard";
import AdminNavBar from "../Admin/AdminNavBar";
import Basket from "../Order/Basket";
import {useNavigate } from 'react-router-dom';
import "socket.io-client";
import { io } from "socket.io-client";

const UserInput = styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const Tabcol = styled.td`
  padding-bottom: 2vh;
  font-size: 3vh;
`;

//charith you can ignore these lines they are for the socket testing
// const socket = io("http://localhost:3001/");
// socket.on("connect", () => {
//   console.log("Connected to the server via WebSocket!");
// });

const SignIn = () => {
  //you cant use export default here because you are assigning
  //an arrow function to it and you cant simultaneously export and assign.
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [currentlychked, setChecked] = useState(null);
  const [error, setError] = useState(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const nav = useNavigate(); //this is used to navigate to a page on demand

  useEffect(() => {
    if (!sessionStorage.getItem("checked")) {
      sessionStorage.setItem("checked", "false");
      setChecked(false);
    } else if (sessionStorage.getItem("checked") == "true") {
      setUsername(sessionStorage.getItem("rememberusername"));
      setPassword(sessionStorage.getItem("password"));
      setChecked(true);
    }
  }, []);

  function handleError() {
    //also called a render method
    if (error) {
      return (
        <center>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "0.5vh solid red",
              borderRadius: "3vh",
              paddingTop: "2vh",
              paddingLeft: "2vh",
              paddingRight: "2vh",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "red",
              }}
            >
              {error}
            </p>
          </div>
        </center>
      );
    }
  }
  async function handleSignIn(event) {
    event.preventDefault();
    if (username && password) {
      if (username.length >= 3 && username.length <= 12) {
        if (password.length >= 5) {
          await axios
            .post("http://localhost:3001/users/signin", { username, password })
            .then((res) => {
              if (res.data.user == "User") {
                sessionStorage.setItem("type","User");
                nav("/menu");
              } else {
                sessionStorage.setItem("type","Admin");
                nav("/adminnavbar");
              }
            })
            .catch((err) => setError(err.response.data.message));
          sessionStorage.setItem("rememberusername", username); 
          sessionStorage.setItem("username", username);   
          if (currentlychked == true) {
            sessionStorage.setItem("checked", JSON.stringify(currentlychked));
            sessionStorage.setItem("password", password);
          } else {
            sessionStorage.setItem("checked", JSON.stringify(currentlychked));
            sessionStorage.removeItem("password");
          }
        } else {
          setError("Please Enter Password Above 4 Characters");
        }
      } else {
        setError("Please Enter Username Between 3 And 12 Characters");
      }
    } else {
      setError("Please Enter Valid Data");
    }
  }
  //use vh and vw for margins and padding and other attributes
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url("/images/LoginBackground.jpg")`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* just for testing please ignore */}

      <button onClick={() => setShowAdminDashboard(true)}>
        Just for testing - will go to the dashboard
      </button>

      <div
        style={{
          marginTop: "5vh",
          border: "0.4vh solid black",
          boxShadow: "0px 0px 10px 3px white",
          padding: "2vh",
          borderRadius: "15px",
          backgroundColor: "white",
          opacity: "93%",
        }}
      >
        <center>
          <h1 style={{ color: "black" }}>Sign In</h1>
        </center>
        <br></br>
        {handleError()}
        {/* {() => changePage("Menu")} */}
        <br></br>
        <form onSubmit={handleSignIn}>
          <table id="login">
            <tr>
              <Tabcol>Username: </Tabcol>
              <td style={{ paddingBottom: "1vh", fontSize: "3vh" }}>
                <UserInput
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <Tabcol>Password: </Tabcol>
              <Tabcol>
                <UserInput
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Tabcol>
            </tr>
            <tr>
              <td>
                <UserInput
                  style={{ width: "2vw", height: "2vh" }}
                  type="checkbox"
                  checked={currentlychked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <p style={{ display: "inline", fontSize: "2vh" }}>
                  Remember Me ?
                </p>
              </td>
            </tr>
          </table>
          <br></br>
          <center>
            <input
              style={{
                width: "50%",
                backgroundColor: "green",
                color: "white",
                borderRadius: "10px",
                border: "0.1vh solid black",
              }}
              type="submit"
              value="Sign In"
            ></input>
            <p style={{ cursor: "pointer"}} onClick={() => nav("/signup")}><u>Create an account</u></p>
          </center>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
