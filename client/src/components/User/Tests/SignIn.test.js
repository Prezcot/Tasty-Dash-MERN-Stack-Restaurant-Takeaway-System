import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "../SignIn";
import {assert} from "chai";

describe("Testing SignIn component", () => {
    var component =render(<SignIn/>);
    const {getByText}=component;
    it("should render the SignIn component", () => {
        const input=getByText("Sign In");
        assert.exists(input,"Sign In Input Button Doesnt Exist");
    })});