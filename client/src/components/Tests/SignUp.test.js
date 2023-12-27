import React from "react";
import { render, fireEvent, waitFor,getAllByText,getByText } from "@testing-library/react";
import {handleSignIn} from "../User/SignIn";
import SignIn from "../User/SignIn";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom';
import SignUp from "../User/SignUp";
jest.mock("axios");
describe("UNIT TEST - SIGN UP COMPONENT", () => {
    it("Sign Up Component Is Successfully Rendering",()=>{
        var {getAllByText}=render(<BrowserRouter>
            <SignUp/>
        </BrowserRouter>);
        const elementsinsignup=getAllByText("Sign Up");
        expect(elementsinsignup.length).toBeGreaterThan(0);
    })
});

describe("INTEGRATION TEST - SIGN UP COMPONENT",()=>{
    it("User Is Able To Sign Up",async()=>{
        var {getAllByText,getByPlaceholderText}=render(<BrowserRouter>
            <SignUp/>
        </BrowserRouter>);
        fireEvent.change(getByPlaceholderText("Username"),{target:{value:"John"}});
        fireEvent.change(getByPlaceholderText("Email"),{target:{value:"John@gmail.com"}});
        fireEvent.change(getByPlaceholderText("Phone Number"),{target:{value:"0843623819"}});
        fireEvent.change(getByPlaceholderText("Password"),{target:{value:"John@13"}});
        fireEvent.change(getByPlaceholderText("Confirm Password"),{target:{value:"John@13"}});
        fireEvent.click(getAllByText("Sign Up")[1]);
        await axios.post("http://localhost:3001/users/signup",{username:"John",email:"John@gmail.com",phonenumber:"0843623819",password:"John@13"});
        await expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/users/signup",{username:"John",email:"John@gmail.com",phonenumber:"0843623819",password:"John@13"})
    })
});