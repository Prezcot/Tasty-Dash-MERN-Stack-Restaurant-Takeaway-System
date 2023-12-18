import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SignUp from "./SignUp";
import AdminDashboard from "../Admin/AdminDashboard";
const UserInput = styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const Tabcol = styled.td`
  padding-bottom: 2vh;
  font-size: 4vh;
`;

const SignIn = () => {
  //you cant use export default here because you are assigning
  //an arrow function to it and you cant simultaneously export and assign.
  const [page, setPage] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [currentlychked, setChecked] = useState(null);
  const [error, setError] = useState(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  function goToAdminDashboard() {
    console.log("Go to dashboard is running");
    setShowAdminDashboard(true);
    console.log(showAdminDashboard);
    if (showAdminDashboard) {
      return <AdminDashboard />;
    }
  }

  useEffect(() => {
    //this useEffect hook will only run by default if the page variable has changed thus avoiding
    //the too many re-renders error.
    if (
      !localStorage.getItem("page") ||
      localStorage.getItem("page") == "SignIn"
    ) {
      setPage("SignIn");
    } else if (localStorage.getItem("page") == "SignUp") {
      setPage("SignUp");
    } else if (localStorage.getItem("page") == "Menu") {
      setPage("Menu");
    }
  });

  useEffect(() => {
    if (!localStorage.getItem("checked")) {
      localStorage.setItem("checked", "false");
      setChecked(false);
    } else if (localStorage.getItem("checked") == "true") {
      setUsername(localStorage.getItem("username"));
      setPassword(localStorage.getItem("password"));
      setChecked(true);
    }
  }, []);

  function changePage(newpage) {
    if (newpage == "Menu") {
      setPage("Menu");
      localStorage.setItem("page", "Menu");
    } else if (newpage == "SignIn") {
      setPage("SignIn");
      localStorage.setItem("page", "SignIn");
    } else if (newpage == "SignUp") {
      setPage("SignUp");
      localStorage.setItem("page", "SignUp");
    }
  }
  function handleError() {
    //also called a render method
    if (error) {
      return (
        <center>
          <div
            style={{
              display: "inline-flex",
              "align-items": "center",
              border: "0.5vh solid red",
              "border-radius": "3vh",
              "padding-top": "2vh",
              "padding-left": "2vh",
              "padding-right": "2vh",
            }}
          >
            <p
              style={{
                "text-align": "center",
                "font-weight": "bold",
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
    console.log("signin");
    event.preventDefault();
    if (username && password && username.length >= 3 && password.length >= 3) {
      await axios
        .post("http://192.168.1.121:3001/users/signin", { username, password })
        .then(() => {
          localStorage.setItem("page", "Menu");
          setPage("Menu");
        })
        .catch((err) => setError(err.response.data.message));

      if (currentlychked == true) {
        localStorage.setItem("checked", JSON.stringify(currentlychked));
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.setItem("checked", JSON.stringify(currentlychked));
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    } else {
      setError("Please Enter Valid Data");
    }
  }
  if (page == "SignIn") {
    //use vh and vw for margins and padding and other attributes
    return (
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
        }}
      >
        {/* just for testing please ignore */}

        <button onClick={goToAdminDashboard}>
          Just for testing -will go to the dashboard
        </button>

        <div
          style={{
            "margin-top": "5vh",
            border: "0.75vh solid black",
            padding: "2vh",
            "border-radius": "15px",
          }}
        >
          <center>
            <h1 style={{ color: "black" }}>Sign In</h1>
          </center>
          <br></br>
          {handleError()}
          {() => changePage("Menu")}
          <br></br>
          <form onSubmit={handleSignIn}>
            <table id="login">
              <tr>
                <Tabcol>Username: </Tabcol>
                <td style={{ "padding-bottom": "2vh", "font-size": "4vh" }}>
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
                  <p style={{ display: "inline", fontSize: "3vh" }}>
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
                  "background-color": "green",
                  color: "white",
                  "border-radius": "10px",
                  border: "0.1vh solid black",
                }}
                type="submit"
                value="Sign In"
              ></input>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => changePage("SignUp")}
              >
                <u>Create an account</u>
              </p>
            </center>
          </form>
        </div>
      </div>
    );
  }
  if (page == "SignUp") {
    return <SignUp />;
  }
  if (page == "Menu") {
    return (
      <div>
        This is route to menu page
        <button id="back" onClick={() => changePage("SignIn")}>
          Go Back
        </button>
      </div>
    );
  }
};

export default SignIn;
