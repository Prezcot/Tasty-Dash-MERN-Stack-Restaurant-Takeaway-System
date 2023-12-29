import React from "react";
import { render, fireEvent, waitFor,getAllByText,getByText } from "@testing-library/react";
import Menu from "../Menu/Menu";
import Item from "../Menu/Item";
import Cart from "../Menu/Cart";
import Basket from "../Order/Basket";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom';

jest.mock("axios");

describe("UNIT TEST - MENU COMPONENT", () => {
    it("Menu Component Is Successfully Rendering", () => {
        var {getAllByText} =render(
            <BrowserRouter>
                <Menu/>
            </BrowserRouter>);
        const elementswithmenu=getAllByText("Menu");
        expect(elementswithmenu.length).toBeGreaterThan(0);
    });

    it("Menu Items Are Successfully Rendering", () => {
        var {getAllByText} =render(
            <BrowserRouter>
                <Menu/>
            </BrowserRouter>);
        setTimeout(()=>{
            const elementswithmenu=getAllByText("+");// we use + because all items consist of that constant display and now the test would work regardless of which item is removed.
            expect(elementswithmenu.length).toBeGreaterThan(0);
        },5000);
        
    });


    it('Item increases quantity when Add button is clicked', () => {
        const item = {
          itemName: 'Test Item',
          itemDescription: 'Description for Test Item',
          itemPrice: 10.99,
          itemImage: 'test-image.jpg',
        };
    
        const onAddToCartMock = jest.fn();
        const onRemoveFromCartMock = jest.fn();
    
        const { getByTestId } = render(
          <Item
            item={item}
            quantity={0}
            onAddToCart={onAddToCartMock}
            onRemoveFromCart={onRemoveFromCartMock}
          />
        );

        expect(getByTestId('my-quantity')).toHaveTextContent('0');
        fireEvent.click(getByTestId('add'));
        expect(getByTestId('my-quantity')).toHaveTextContent('1');
        
      });

    it('Item decreases quantity when Remove button is clicked', () => {
        const item = {
          itemName: 'Test Item',
          itemDescription: 'Description for Test Item',
          itemPrice: 10.99,
          itemImage: 'test-image.jpg',
        };
    
        const onAddToCartMock = jest.fn();
        const onRemoveFromCartMock = jest.fn();
    
        const { getByTestId } = render(
          <Item
            item={item}
            quantity={1}
            onAddToCart={onAddToCartMock}
            onRemoveFromCart={onRemoveFromCartMock}
          />
        );
    
        expect(getByTestId('my-quantity')).toHaveTextContent('1');
        fireEvent.click(getByTestId('minus'));
        expect(getByTestId('my-quantity')).toHaveTextContent('0');
        
      });
      
      it('View Basket button is shown when hovering over cart icon', () => {
        const items = [
          { itemName: 'Item1', itemPrice: 10 },
          { itemName: 'Item2', itemPrice: 15 },
        ];
        const quantityMap = {
          Item1: 2,
          Item2: 1,
        };
        var {getAllByText,getByAltText,getByText,getByRole} =render(
            <BrowserRouter>
                <Cart items={items} quantityMap={quantityMap} />
            </BrowserRouter>);
      
        const cartIcon = getByAltText('Shopping Cart');
        fireEvent.mouseEnter(cartIcon);
        expect(getByText("View My Basket")).toBeInTheDocument();
        
      });
      
    
});




describe("INTEGRATION TEST - MENU COMPONENT",()=>{
    it("Navigates to Basket page",async()=>{
        const items = [
          { itemName: 'Item1', itemPrice: 10 },
          { itemName: 'Item2', itemPrice: 15 },
        ];
        const quantityMap = {
          Item1: 2,
          Item2: 1,
        };
        var {getAllByText,getByAltText,getByText,getByRole} =render(
            <BrowserRouter>
                <Cart items={items} quantityMap={quantityMap} />
            </BrowserRouter>);
      
        const cartIcon = getByAltText('Shopping Cart');
        fireEvent.mouseEnter(cartIcon);
        fireEvent.click(getByText("View My Basket"));
        var {getAllByText,queryByText,getByPlaceholderText}=render(<BrowserRouter>
            <Basket/>
        </BrowserRouter>);
        var elementsinmenu=getAllByText("Your Basket");
        expect(elementsinmenu.length).toBeGreaterThan(0);
    });


    it("Gets data from Menu collection in mongoDB and renders items", async () => {
        
        const sampleData = [
            {
              itemName: "Cheese Pizza",
              itemDescription: "Cheese pizza",
              itemPrice: 5.99,
              itemImage: "imagepath",
              itemType: "mainCourse",
            },
            {
              itemName: "Chocolate Cake",
              itemDescription: "Chocolate cake",
              itemPrice: 1.99,
              itemImage: "imagepath",
              itemType: "dessert",
            },
            {
              itemName: "Garlic Bread",
              itemDescription: "Garlic bread",
              itemPrice: 0.99,
              itemImage: "imagepath",
              itemType: "starter",
            },
          ];
        
        axios.get.mockResolvedValueOnce({ data: sampleData });
    
        
        var {getByText} =render(
            <BrowserRouter>
                <Menu/>
            </BrowserRouter>);
        
        await waitFor(() => {
          // Check if the items are rendered based on the sample data
          expect(getByText("Cheese Pizza")).toBeInTheDocument();
          expect(getByText("Chocolate Cake")).toBeInTheDocument();
          expect(getByText("Garlic Bread")).toBeInTheDocument();
        });
    
        // Check if the axios get method was called with the correct URL
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3001/menu/data");
      });
});

