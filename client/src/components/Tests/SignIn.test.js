import React from "react";
import { render, fireEvent, waitFor,getAllByText,getByText } from "@testing-library/react";
import {handleSignIn} from "../User/SignIn";
import SignIn from "../User/SignIn";
import Menu from "../Menu/Menu";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom';
jest.mock("axios");
window.setImmediate = window.setTimeout;
describe("UNIT TEST - SIGN IN COMPONENT", () => {
    it("Sign In Component Is Successfully Rendering", () => {
        var {getAllByText} =render(
            <BrowserRouter>
                <SignIn/>
            </BrowserRouter>);
        const elements_with_signin=getAllByText("Sign In");
        expect(elements_with_signin.length).toBeGreaterThan(0);
    });
    it("User's Password Must Be Above 4 Characters",()=>{
        var {getAllByText,getByText,getByPlaceholderText}=render(<BrowserRouter>
            <SignIn/>
            </BrowserRouter>);
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'User' } });
        fireEvent.click(getAllByText("Sign In")[1]);
        expect(getByText("Please Enter A Password Above 4 Characters")).toBeInTheDocument();
        });
});

describe("INTEGRATION TEST - SIGN IN COMPONENT",()=>{
    it("User Is Able To Sign In",async()=>{
        var {getAllByText,getByPlaceholderText}=render(<BrowserRouter>
            <SignIn/>
        </BrowserRouter>);
        const expected_result = { data: { message: "Account Registered", user: "User" } };
        axios.post.mockResolvedValue(expected_result);
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'User12,' } });
        fireEvent.click(getAllByText("Sign In")[1]);
        await expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/users/signin",{"username":"user","password":"User12,"});
    });
});

describe("INTEGRATION TEST - SIGN IN COMPONENT",()=>{
    it("User Is Taken To Menu Page After Signing In",async()=>{
        var {getAllByText,queryByText,getByPlaceholderText}=render(<BrowserRouter>
            <SignIn/>
        </BrowserRouter>);
        const expected_result = { data: { message: "Account Registered", user: "User" } };
        axios.post.mockResolvedValue(expected_result);
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'User12,' } });
        fireEvent.click(getAllByText("Sign In")[1]);
        await expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/users/signin",{"username":"user","password":"User12,"});
        var {getAllByText,queryByText,getByPlaceholderText}=render(<BrowserRouter>
            <Menu/>
        </BrowserRouter>);
        var elements_in_menu=getAllByText("Menu");
        expect(elements_in_menu.length).toBeGreaterThan(0);
    });
});
//an integration test can be for example seeing if clicking a button takes the user to another page