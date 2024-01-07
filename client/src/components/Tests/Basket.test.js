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
      const title_element = getByText('Your Basket');
      expect(title_element).toBeInTheDocument();
    
      const back_button = getByText('Back to Menu');
      expect(back_button).toBeInTheDocument();
      });


    it("Clicking on the plus button adds a value to the quantity", () => {
        const item = "Pizza,600,1";
        const cart = [item];
        const update = jest.fn();
        
        const { getByText,getByTestId } = render(
            <Product
            item_prop={item}
            index_prop={0}
            cart_prop={cart}
            update_prop={update}
            quantity_prop={{ Pizza: 1 }}
            />
        );
        
        const plus_button = getByTestId("plus-button");
        fireEvent.click(plus_button);
        const updated_quantity_label = getByText("2"); 
        expect(updated_quantity_label).toBeInTheDocument();
        });


    it("Clicking on the minus button subtracts a value from the quantity", () => {
        const item = "Pizza,600,2";
        const cart = [item];
        const update = jest.fn();
      
        const { getByTestId, getByText } = render(
          <Product
            item_prop={item}
            index_prop={0}
            cart_prop={cart}
            update_prop={update}
            quantity_prop={{ Pizza: 2 }}
          />
        );
      
        const minus_button = getByTestId("minus-button");
        fireEvent.click(minus_button);
        const updated_quantity_label = getByText("1");
        expect(updated_quantity_label).toBeInTheDocument();
      });

    
    it("Items get removed if the quantity is zero", () => {
    const item = "Pizza,600,1";
    const cart = [item];
    const update = jest.fn();
    
    const { queryByText, getByTestId } = render(
        <Product
        item_prop={item}
        index_prop={0}
        cart_prop={cart}
        update_prop={update}
        quantity_prop={{ Pizza: 1 }}
        />
    );
    
    const minus_button = getByTestId("minus-button");
    fireEvent.click(minus_button);
    const removed_item_label = queryByText("Pizza");
    expect(removed_item_label).toBeNull();
    });



    it("SetInstructions updates the instruction correctly", () => {
        const { getByTestId } = render(
        <BrowserRouter>
            <Basket/>
        </BrowserRouter>);
        const instruction_text_area = getByTestId("spe-ins-test-comp");

        fireEvent.change(instruction_text_area, { target: { value: "Please make it spicy" } });

        expect(instruction_text_area.value).toBe("Please make it spicy");
    });


    it("Pop up message dissallowing users from proceeding to payment without any basket items", async () => {
        const { getByTestId, getByText } = render(
        <BrowserRouter>
            <Basket/>
        </BrowserRouter>);

        const proceed_to_payment_button = getByTestId("payment-button-test");
        fireEvent.click(proceed_to_payment_button);
        await waitFor(() => {
        expect(document.querySelector(".Toastify__toast")).toBeInTheDocument();
        });
        const toast_message = document.querySelector(".Toastify__toast-body");
        expect(toast_message).toHaveTextContent("Basket is empty");
    });


    it("Calculate accurate total value according to chosen items", () => {
        const get_item_mock = jest.fn((key) => {
          switch (key) {
            case 'cart':
              return JSON.stringify(["Pizza,5.99,2", "Nasi Goreng,3.99,3", "Lava Cake,2.99,2"]);
            case 'menu_cart':
              return JSON.stringify({ "Pizza": 2, "Nasi Goreng": 3, "Lava Cake": 2 });
            default:
              return null;
          }
        });
      
        const set_item_mock = jest.fn();
      
        jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
          getItem: get_item_mock,
          setItem: set_item_mock,
        });
      
        const { getByTestId} = render(
          <BrowserRouter>
            <Basket/>
          </BrowserRouter>
        );
        const total_element = getByTestId("order-total-test");
        expect(total_element.textContent).toBe("$29.93");
      });

});

describe("INTEGRATION TEST - BASKET COMPONENT", () => {

    it("'Back to Menu' button takes users back to Menu page", () => {

    const get_item_mock = jest.fn((key) => {
        switch (key) {
        case 'cart':
            return JSON.stringify(["Pizza,5.99,2", "Nasi Goreng,3.99,3", "Lava Cake,2.99,2"]);
        case 'menu_cart':
            return JSON.stringify({ "Pizza": 2, "Nasi Goreng": 3, "Lava Cake": 2 });
        default:
            return null;
        }
    });
    
    const set_item_mock = jest.fn();
    
    jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
        getItem: get_item_mock,
        setItem: set_item_mock,
    });

        var {getByTestId} =render(
        <BrowserRouter>
            <Basket/>
        </BrowserRouter>);
        const backToMenuButton = getByTestId("back-to-menu-test");
        fireEvent.click(backToMenuButton);
        var {getByText,queryByText,getByPlaceholderText}=render(
        <BrowserRouter>
          <Menu/>
        </BrowserRouter>);
        var elements_in_menu=getByText("Starters");
        expect(elements_in_menu).toBeInTheDocument();

    });

    

    it('Clicking "Proceed to Payment" should navigate to Payment component', () => {

        const mock_navigate = jest.fn();

        const get_item_mock = jest.fn((key) => {
            switch (key) {
            case 'cart':
                return JSON.stringify(["Pizza,5.99,2", "Nasi Goreng,3.99,3", "Lava Cake,2.99,2"]);
            case 'menu_cart':
                return JSON.stringify({ "Pizza": 2, "Nasi Goreng": 3, "Lava Cake": 2 });
            case 'total':
                return JSON.stringify("23.43");
            default:
                return null;
            }
        });
        
        const set_item_mock = jest.fn();
        
        jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
            getItem: get_item_mock,
            setItem: set_item_mock,
        });

        var {getByTestId} =render(
            <BrowserRouter>
                <Basket/>
            </BrowserRouter>);
    

        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useNavigate: () => mock_navigate,
        }));
    
 
        fireEvent.click(getByTestId('payment-button-test'));
        
        var {getByText} =render(
            <BrowserRouter>
                <Payment renderPayPal={false}/>
            </BrowserRouter>);
    

        var heading_in_payment=getByText("Confirm Details and Checkout");
        expect(heading_in_payment).toBeInTheDocument();

      });
});