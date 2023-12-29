import React from "react";
import { render, fireEvent, waitFor,getAllByText,getByText } from "@testing-library/react";
import Menu from "../Menu/Menu";
import Basket from "../Order/Basket";
import Product from "../Order/Product";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

jest.mock("axios");

describe("UNIT TEST - BASKET COMPONENT", () => {

    it('Renders Basket component', () => {
        var {getByText} =render(
        <BrowserRouter>
            <Menu/>
        </BrowserRouter>);

        var {getByText} =render(
        <BrowserRouter>
            <Basket/>
        </BrowserRouter>);
      const titleElement = getByText('Your Basket');
      expect(titleElement).toBeInTheDocument();
    
      const backButton = getByText('Back to Menu');
      expect(backButton).toBeInTheDocument();
      });


    it("Clicking on the plus button adds a value to the quantity", () => {
        const item = "Pizza,600,1";
        const cart = [item];
        const update = jest.fn();
        
        const { getByText,getByTestId } = render(
            <Product
            itemProp={item}
            indexProp={0}
            cartProp={cart}
            updateProp={update}
            quantityProp={{ Pizza: 1 }}
            />
        );
        
        const plusButton = getByTestId("plus-button");
        fireEvent.click(plusButton);
        const updatedQuantityLabel = getByText("2"); 
        expect(updatedQuantityLabel).toBeInTheDocument();
        });


    it("Clicking on the minus button subtracts a value from the quantity", () => {
        const item = "Pizza,600,2";
        const cart = [item];
        const update = jest.fn();
      
        const { getByTestId, getByText } = render(
          <Product
            itemProp={item}
            indexProp={0}
            cartProp={cart}
            updateProp={update}
            quantityProp={{ Pizza: 2 }}
          />
        );
      
        const minusButton = getByTestId("minus-button");
        fireEvent.click(minusButton);
        const updatedQuantityLabel = getByText("1");
        expect(updatedQuantityLabel).toBeInTheDocument();
      });

    
    it("Items get removed if the quantity is zero", () => {
    const item = "Pizza,600,1";
    const cart = [item];
    const update = jest.fn();
    
    const { queryByText, getByTestId } = render(
        <Product
        itemProp={item}
        indexProp={0}
        cartProp={cart}
        updateProp={update}
        quantityProp={{ Pizza: 1 }}
        />
    );
    
    const minusButton = getByTestId("minus-button");
    fireEvent.click(minusButton);
    const removedItemLabel = queryByText("Pizza");
    expect(removedItemLabel).toBeNull();
    });



    it("SetInstructions updates the instruction correctly", () => {
        const { getByTestId } = render(
        <BrowserRouter>
            <Basket/>
        </BrowserRouter>);
        const instructionTextarea = getByTestId("spe-ins-test-comp");

        fireEvent.change(instructionTextarea, { target: { value: "Please make it spicy" } });

        expect(instructionTextarea.value).toBe("Please make it spicy");
    });


    it("Pop up message dissallowing users from proceeding to payment without any basket items", async () => {
        const { getByTestId, getByText } = render(
        <BrowserRouter>
            <Basket/>
        </BrowserRouter>);

        const proceedToPaymentButton = getByTestId("payment-button-test");
        fireEvent.click(proceedToPaymentButton);
        await waitFor(() => {
        expect(document.querySelector(".Toastify__toast")).toBeInTheDocument();
        });
        const toastMessage = document.querySelector(".Toastify__toast-body");
        expect(toastMessage).toHaveTextContent("Basket is empty");
    });


    it("Calculate accurate total value according to chosen items", () => {
        const getItemMock = jest.fn((key) => {
          switch (key) {
            case 'cart':
              return JSON.stringify(["Pizza,5.99,2", "Nasi Goreng,3.99,3", "Lava Cake,2.99,2"]);
            case 'menuCart':
              return JSON.stringify({ "Pizza": 2, "Nasi Goreng": 3, "Lava Cake": 2 });
            default:
              return null;
          }
        });
      
        const setItemMock = jest.fn();
      
        jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
          getItem: getItemMock,
          setItem: setItemMock,
        });
      
        const { getByTestId} = render(
          <BrowserRouter>
            <Basket/>
          </BrowserRouter>
        );
        const totalElement = getByTestId("order-total-test");
        expect(totalElement.textContent).toBe("$29.93");
      });
      
      
describe("INTEGRATION TEST - BASKET COMPONENT", () => {

    it("'Back to Menu' button takes users back to Menu page", () => {

    const getItemMock = jest.fn((key) => {
        switch (key) {
        case 'cart':
            return JSON.stringify(["Pizza,5.99,2", "Nasi Goreng,3.99,3", "Lava Cake,2.99,2"]);
        case 'menuCart':
            return JSON.stringify({ "Pizza": 2, "Nasi Goreng": 3, "Lava Cake": 2 });
        default:
            return null;
        }
    });
    
    const setItemMock = jest.fn();
    
    jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
        getItem: getItemMock,
        setItem: setItemMock,
    });

        var {getByTestId} =render(
        <BrowserRouter>
            <Basket/>
        </BrowserRouter>);
        const backToMenuButton = getByTestId("back-to-menu-test");
        fireEvent.click(backToMenuButton);
        var {getAllByText,queryByText,getByPlaceholderText}=render(<BrowserRouter>
        <Menu/>
        </BrowserRouter>);
        var elementsinmenu=getAllByText("Menu");
        expect(elementsinmenu.length).toBeGreaterThan(0);

        });
});
});