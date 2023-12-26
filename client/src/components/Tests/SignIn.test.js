import React from "react";
import { render, fireEvent, waitFor,getAllByText,getByText } from "@testing-library/react";
import {handleSignIn} from "../User/SignIn";
import SignIn from "../User/SignIn";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom';
jest.mock("axios");
describe("UNIT TEST - SIGN IN COMPONENT", () => {
    it("Sign In Component Is Successfully Rendering", () => {
        var {getAllByText} =render(
            <BrowserRouter>
                <SignIn/>
            </BrowserRouter>);
        const elementswithsignin=getAllByText("Sign In");
        expect(elementswithsignin.length).toBeGreaterThan(0);
    });
    it("User's Password Must Be Above 4 Characters",()=>{
        var {getAllByText,getByText,getByPlaceholderText}=render(<BrowserRouter>
            <SignIn/>
            </BrowserRouter>);
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'User' } });
        fireEvent.click(getAllByText("Sign In")[1]);
        expect(getByText("Please Enter Password Above 4 Characters")).toBeInTheDocument();
        });
});

describe("SYSTEM TEST - SIGN IN COMPONENT",()=>{
    it("Axios Post Request And Response Is Functioning",async()=>{
        var {getAllByText,getByPlaceholderText}=render(<BrowserRouter>
            <SignIn/>
        </BrowserRouter>);
        const expectedresult = { data: { message: "Account Registered", user: "User" } };
        axios.post.mockResolvedValue(expectedresult);
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'User12,' } });
        fireEvent.click(getAllByText("Sign In")[1]);
        await expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/users/signin",{"username":"user","password":"User12,"});
    });
});

//an integration test can be for example seeing if clicking a button takes the user to another page