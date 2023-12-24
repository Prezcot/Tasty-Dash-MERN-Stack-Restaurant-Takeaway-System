import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "../User/SignIn";
import { BrowserRouter } from "react-router-dom";
describe("Testing SignIn component", () => {
    it("should render the SignIn component", () => {
        var {getAllByText} =render(
            <BrowserRouter>
                <SignIn/>
            </BrowserRouter>);
        const elementswithsignin=getAllByText("Sign In");
        expect(elementswithsignin.length).toBeGreaterThan(0);
    })});