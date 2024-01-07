import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SignUp from "./SignUp";
import AdminDashboard from "../Admin/AdminDashboard";
import Menu from "../Menu/Menu";
import Dashboard from "./Dashboard";
import AdminNavBar from "../Admin/AdminNavBar";
import Basket from "../Order/Basket";
import { useNavigate } from "react-router-dom";
import "socket.io-client";
import { io } from "socket.io-client";

const UserInput = styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const TabCol = styled.td`
  padding-bottom: 2vh;
  font-size: 3vh;
`;

const SignIn = () => {
  //you cant use export default here because you are assigning
  //an arrow function to it and you cant simultaneously export and assign.
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [currently_chked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate(); //this is used to navigate to a page on demand

  useEffect(() => {
    if (!localStorage.getItem("checked")) {
      localStorage.setItem("checked", "false");
      setChecked(false);
    } else if (localStorage.getItem("checked") == "true") {
      setUsername(localStorage.getItem("remember_username"));
      setPassword(localStorage.getItem("password"));
      setChecked(true);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("alert_msg")) {
      setError(sessionStorage.getItem("alert_msg"));
    }
  }, []);
  function handleError() {
    //also called a render method
    if (error) {
      if (!sessionStorage.getItem("alert_msg")) {
        return (
          <center>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "0.1vh solid red",
                borderRadius: "1vh",
                paddingTop: "2vh",
                paddingLeft: "2vh",
                paddingRight: "2vh",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  color: "red",
                }}
              >
                {error}
              </p>
            </div>
          </center>
        );
      } else {
        return (
          <center>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "0.1vh solid green",
                borderRadius: "1vh",
                paddingTop: "2vh",
                paddingLeft: "2vh",
                paddingRight: "2vh",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  color: "green",
                }}
              >
                {error}
              </p>
            </div>
          </center>
        );
      }
    }
  }
  async function handleSignIn(event) {
    event.preventDefault();
    sessionStorage.setItem("username", username);
    sessionStorage.removeItem("alert_msg");
    if (username && password) {
      if (username.length >= 3 && username.length <= 12) {
        if (password.length >= 5) {
          try {
            await axios
              .post("http://localhost:3001/users/signin", {
                username,
                password,
              })
              .then((res) => {
                if (res.data.user == "User") {
                  sessionStorage.setItem("token", res.data.token);
                  sessionStorage.setItem("email", res.data.email);
                  nav("/menu");
                } else {
                  sessionStorage.setItem("token", res.data.token);
                  nav("/admin");
                }
              })
              .catch((err) => setError(err.response.data.message));
          } catch {
            console.log("error");
          }
          if (currently_chked == true) {
            localStorage.setItem("remember_username", username);
            localStorage.setItem("checked", JSON.stringify(currently_chked));
            localStorage.setItem("password", password);
          } else {
            localStorage.setItem("checked", JSON.stringify(currently_chked));
            localStorage.removeItem("password");
            localStorage.removeItem("remember_username");
          }
        } else {
          setError("Please Enter A Password Above 4 Characters");
        }
      } else {
        setError("Please Enter A Username Between 3 And 12 Characters");
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
        alignItems: "flex-start",
        backgroundImage: `url("/images/LoginBackground.jpg")`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <button
          onClick={() => nav("/home")}
          style={{
            float: "left",
            marginTop: "1vh",
            marginLeft: "1vh",
            backgroundColor: "black",
            color: "white",
            borderRadius: "1vh",
            border: "0.1vh solid black",
            fontSize: "2vh",
          }}
        >
          Back To Home
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
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
                <TabCol>Username: </TabCol>
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
                <TabCol>Password: </TabCol>
                <TabCol>
                  <UserInput
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </TabCol>
              </tr>
              <tr>
                <td>
                  <UserInput
                    style={{ width: "2vw", height: "2vh" }}
                    type="checkbox"
                    checked={currently_chked}
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
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "10px",
                  border: "0.1vh solid black",
                }}
                type="submit"
                value="Sign In"
              ></input>
              <p style={{ cursor: "pointer" }} onClick={() => nav("/signup")}>
                <u style={{ display: "block" }}>Create an account</u>
              </p>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
