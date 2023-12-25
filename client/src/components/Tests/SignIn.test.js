import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {handleSignIn} from "../User/SignIn";
import SignIn from "../User/SignIn";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
jest.mock("axios");
describe("Testing If SignIn.jsx Component Renders", () => {
    it("should render the SignIn component", () => {
        var {getAllByText} =render(
            <BrowserRouter>
                <SignIn/>
            </BrowserRouter>);
        const elementswithsignin=getAllByText("Sign In");
        expect(elementswithsignin.length).toBeGreaterThan(0);
    })});

describe("Testing If Axios Call Is Successful",()=>{
    it("Testing Axios Post Request",async()=>{
        const data={username:"user",password:"User12,"};
        const expectedresult={message:"Account Registered",user:"User"};
        axios.post.mockResolvedValue({data});
        const response=await handleSignIn();
        expect(response).toEqual(expectedresult);
    });
});