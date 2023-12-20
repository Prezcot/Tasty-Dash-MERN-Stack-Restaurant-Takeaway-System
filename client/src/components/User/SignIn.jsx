import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SignUp from "./SignUp";
import AdminDashboard from "../Admin/AdminDashboard";
import Menu from "../Menu/Menu";
import Dashboard from "./Dashboard";
const UserInput = styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const Tabcol = styled.td`
  padding-bottom: 2vh;
  font-size: 3vh;
`;

const SignIn = () => {
  //you cant use export default here because you are assigning
  //an arrow function to it and you cant simultaneously export and assign.
  const [page, setPage] = useState("SignIn");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [currentlychked, setChecked] = useState(null);
  const [error, setError] = useState(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  useEffect(() => {
    //this useEffect hook will only run by default if the page variable has changed thus avoiding
    //the too many re-renders error.
    if (sessionStorage.getItem("page") == "SignIn")
    {
        setPage("SignIn");
    } else if (sessionStorage.getItem("page") == "SignUp") {
      setPage("SignUp");
    } else if (sessionStorage.getItem("page") == "Menu") {
      setPage("Menu");
    } else if (sessionStorage.getItem("page")=="Admin"){
      setPage("Admin");
    }
  });

  useEffect(() => {
    if (!sessionStorage.getItem("checked")) {
      sessionStorage.setItem("checked", "false");
      setChecked(false);
    } else if (sessionStorage.getItem("checked") == "true") {
      setUsername(sessionStorage.getItem("username"));
      setPassword(sessionStorage.getItem("password"));
      setChecked(true);
    }
  }, []);

  function changePage(newpage) {
    if (newpage == "Menu") {
      setPage("Menu");
      sessionStorage.setItem("page", "Menu");
    } else if (newpage == "SignIn") {
      setPage("SignIn");
      sessionStorage.setItem("page", "SignIn");
    } else if (newpage == "SignUp") {
      setPage("SignUp");
      sessionStorage.setItem("page", "SignUp");
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
    console.log("signin");
    event.preventDefault();
    if (username && password && username.length >= 3 && password.length >= 3) {
      await axios
        .post("http://localhost:3001/users/signin", { username, password })
        .then((res) => {
          if (res.data.user=="User")
          {
            sessionStorage.setItem("page", "Menu");
            setPage("Menu");
          }
          else{
            sessionStorage.setItem("page","Admin")
            setShowAdminDashboard(true)
          }
          
        })
        .catch((err) => setError(err.response.data.message));

      if (currentlychked == true) {
        sessionStorage.setItem("checked", JSON.stringify(currentlychked));
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
      } else {
        sessionStorage.setItem("checked", JSON.stringify(currentlychked));
        sessionStorage.removeItem("password");
      }
    } else {
      setError("Please Enter Valid Data");
    }
  }
  if (showAdminDashboard) {
    return <AdminDashboard />;
  }
  if (page == "SignIn") {
    //use vh and vw for margins and padding and other attributes
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage:`url("/images/LoginBackground.jpg")`,
            backgroundSize: "100vw 100vh",
            backgroundRepeat:"no-repeat",
            width:"100vw",
            height:"100vh",
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
              boxShadow:"0px 0px 10px 3px white",
              padding: "2vh",
              borderRadius: "15px",
              backgroundColor:"white",
              opacity:"93%"
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
    return <Menu></Menu>;
  }
  if (page=="Admin"){
    return <AdminDashboard></AdminDashboard>
  }
};

export default SignIn;
