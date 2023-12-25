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
        var {getAllByText,getByPlaceholderText}=render(<BrowserRouter>
            <SignIn/>
        </BrowserRouter>);
        const expectedresult = { data: { message: "Account Registered", user: "User" } };
        axios.post.mockResolvedValue(expectedresult);
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'User12,' } });
        fireEvent.click(getAllByText("Sign In")[1]);
        await waitFor(() => expect(axios.post).toHaveBeenCalled);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/users/signin",{"username":"user","password":"User12,"});
    });
});