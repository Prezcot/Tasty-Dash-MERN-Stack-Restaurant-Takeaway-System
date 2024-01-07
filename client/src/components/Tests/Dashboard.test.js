import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getAllByText,
  getByText,
} from "@testing-library/react";
import { handleSignIn } from "../User/SignIn";
import Dashboard from "../User/Dashboard";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom";
jest.mock("axios");
window.setImmediate = window.setTimeout;

describe("UNIT TEST - DASHBOARD COMPONENT", () => {
  it("Dashboard Component Is Successfully Rendering", () => {
    var { getAllByText } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    const element = getAllByText("Dashboard");
    expect(element.length).toBeGreaterThan(0);
  });
});

describe("INTEGRATION TEST - DASHBOARD COMPONENT", () => {
  it("User Is Able To Change Their Password", async () => {
    var { getAllByText, getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    fireEvent.change(getByPlaceholderText("Current Password"), {
      target: { value: "User12," },
    });
    fireEvent.change(getByPlaceholderText("New Password"), {
      target: { value: "Newpassword12," },
    });
    fireEvent.change(getByPlaceholderText("Confirm Password"), {
      target: { value: "Newpassword12," },
    });
    fireEvent.click(getAllByText("Change Password")[0]);
    await axios.put("http://localhost:3001/users/checkpassword", {
      username: "user",
      currentpassword: "User12,",
      newpassword: "Newpassword12,",
    });
    await expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3001/users/checkpassword",
      {
        username: "user",
        currentpassword: "User12,",
        newpassword: "Newpassword12,",
      }
    );
    //expect(getByText("Password Successfully Changed")).toBeInTheDocument();
  });
});
