import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "../User/SignIn";
import {assert} from "chai";
import { BrowserRouter } from "react-router-dom";
describe("Testing SignIn component", () => {
    it("should render the SignIn component", () => {
        var component =render(
            <BrowserRouter>
                <SignIn/>
            </BrowserRouter>);
        const {getByText}=component;
        const input=getByText("Sign In");
        assert.exists(input,"Sign In Input Button Doesnt Exist");
    })});