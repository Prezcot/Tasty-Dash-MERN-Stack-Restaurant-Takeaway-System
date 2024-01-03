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
window.setImmediate = window.setTimeout;

describe("UNIT TEST - PAYMENT COMPONENT", () => {

    it('Renders Checkout component', () => {
        var {getByText} =render(
            <BrowserRouter>
                <Payment renderPayPal={false}/>
            </BrowserRouter>);
    
        // Check if the navigate function was called with the correct path
        var headinginpayment=getByText("Confirm Details and Checkout");
        expect(headinginpayment).toBeInTheDocument();
    });

});

    
describe("INTEGRATION TEST - PAYMENT COMPONENT", () => {
    
    it("Values set in Basket page appear in Payment page", () => {
        const mockNavigate = jest.fn();

        const getItemMock = jest.fn((key) => {
            switch (key) {
            case 'cart':
                return JSON.stringify(["Pizza,5.99,2"]);
            case 'menuCart':
                return JSON.stringify({ "Pizza": 2});
            case 'customer_instruction':
                return "I have an allergy to nuts";
            case 'total':
                return "11.98"
            default:
                return null;
            }
        });
        
        const setItemMock = jest.fn();
        
        jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
            getItem: getItemMock,
            setItem: setItemMock,
        });
        // Render the Basket component inside MemoryRouter
        var {getByTestId} =render(
            <BrowserRouter>
                <Basket/>
            </BrowserRouter>);
    
        // Mock the useNavigate hook to return the mockNavigate function
        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useNavigate: () => mockNavigate,
        }));
    
        // Find the "Proceed to Payment" button and click it
        fireEvent.click(getByTestId('payment-button-test'));
        
        var {getByText} =render(
            <BrowserRouter>
                <Payment renderPayPal={false}/>
            </BrowserRouter>);

        expect(getByTestId("payment-items-test")).toHaveTextContent("Pizza (x2)");
        expect(getByTestId("payment-instruction-test")).toHaveTextContent("I have an allergy to nuts");
        expect(getByTestId("payment-total-test")).toHaveTextContent("11.98");
    });
});
