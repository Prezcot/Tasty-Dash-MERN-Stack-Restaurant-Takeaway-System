import SignIn from "./SignIn";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import validator from "validator";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router";
const UserInput = styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const TabCol = styled.td`
  padding-bottom: 2vh;
  font-size: 3vh;
`;

function SignUp() {
  const [email, setEmail] = useState();
  const [phone_number, setPhoneNumber] = useState();
  const [cnfrm_password, setCnfrmPassword] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  sessionStorage.removeItem("password");
  const nav = useNavigate();
  function handleError() {
    //also called a render method
    if (error) {
      return (
        <center>
          <div
            style={{
              display: "inline-flex",
              "align-items": "center",
              border: "0.1vh solid red",
              "border-radius": "1vh",
              "padding-top": "2vh",
              "padding-left": "2vh",
              "padding-right": "2vh",
            }}
          >
            <p
              style={{
                "text-align": "center",
                "font-weight": "normal ",
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
  function checkForSpecialChar(password) {
    const regex = /[`!,.@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
    return regex.test(password);
  }
  function checkForUpperCase(password) {
    const regex = /[A-Z]/;
    return regex.test(password);
  }
  function checkForLowerCase(password) {
    const regex = /[a-z]/;
    return regex.test(password);
  }
  async function handleSignUp(event) {
    event.preventDefault();
    try {
      setUsername(username.toLowerCase().trim());
      setPassword(password.trim());

      if (
        checkForLowerCase(password) &&
        checkForUpperCase(password) &&
        checkForSpecialChar(password) &&
        username.length >= 4 &&
        username.length <= 12 &&
        validator.isEmail(email) &&
        !isNaN(phone_number) &&
        phone_number.length == 10 &&
        password.length >= 5 &&
        cnfrm_password == password
      ) {
        await axios
          .post("http://localhost:3001/users/signup", {
            username,
            email,
            phone_number,
            password,
          })
          .then((res) => {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("token", res.data.token);
            nav("/menu");
          })
          .catch((err) => setError(err.response.data.message));
      } else if (!checkForSpecialChar(password)) {
        setError("Password Must Contain A Special Character");
      } else if (!checkForLowerCase(password)) {
        setError("Password Must Contain A Lower Case Character");
      } else if (!checkForUpperCase(password)) {
        setError("Password Must Contain A Upper Case Character");
      } else if (username.length < 4 || username.length > 12) {
        setError("Please Enter A Username Between 4-12 Characters");
      } else if (isNaN(phone_number)) {
        setError("Please Enter A Valid Phone Number");
      } else if (password != cnfrm_password) {
        setError("Passwords Not Matching");
      } else if (!validator.isEmail(email)) {
        setError("Invalid Email");
      } else if (phone_number.length != 10) {
        setError("Please Enter A Phone Number With 10 Digits");
      } else if (password.length < 5) {
        setError("Please Enter A Password Above 4 Characters");
      } else {
        setError("Please Enter Valid Data");
      }
    } catch {
      setError("Please Enter Valid Data");
    }
  }
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
          <h1 style={{ color: "black" }}>Sign Up</h1>
        </center>
        <br></br>
        {handleError()}
        <br></br>
        <form onSubmit={handleSignUp}>
          <table id="signup">
            <tr>
              <TabCol>Username: </TabCol>
              <td style={{ paddingBottom: "2vh", fontSize: "3vh" }}>
                <UserInput
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <TabCol>Email: </TabCol>
              <TabCol>
                <UserInput
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </TabCol>
            </tr>
            <tr>
              <TabCol>Phone Number: </TabCol>
              <TabCol>
                <UserInput
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </TabCol>
            </tr>
            <tr>
              <TabCol>Password: </TabCol>
              <TabCol>
                <UserInput
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </TabCol>
            </tr>
            <tr>
              <TabCol>Confirm Password: </TabCol>
              <TabCol>
                <UserInput
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setCnfrmPassword(e.target.value)}
                />
              </TabCol>
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
              value="Sign Up"
            ></input>
            <p>
              Already a member ?{" "}
              <b style={{ cursor: "pointer" }} onClick={() => nav("/signin")}>
                Sign In
              </b>
            </p>
          </center>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
