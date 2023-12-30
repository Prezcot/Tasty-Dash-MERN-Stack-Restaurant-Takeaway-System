import React from "react";
import { render, fireEvent, waitFor,getAllByText,getByText } from "@testing-library/react";
import Menu from "../Menu/Menu";
import Basket from "../Order/Basket";
import Product from "../Order/Product";
import Payment from "../Payment/Payment";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

jest.mock("axios");

describe("UNIT TEST - BASKET COMPONENT", () => {

    it('Renders Basket component', () => {
        var {getByText} =render(
            <BrowserRouter>
                <Payment renderPayPal={false}/>
            </BrowserRouter>);
    
        // Check if the navigate function was called with the correct path
        var headinginpayment=getByText("Checkout");
        expect(headinginpayment).toBeInTheDocument();
    });
});