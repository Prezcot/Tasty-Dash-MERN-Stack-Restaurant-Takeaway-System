import React from "react";
import { render, fireEvent, waitFor,getAllByText,getByText, getByTestId } from "@testing-library/react";
import AdminMenu from "../Admin/AdminMenu";
import AdminItem from "../Admin/AdminItem";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom';

jest.mock('axios');

describe('UNIT TEST ADMIN COMPONENT', () => {
  it('enders AdminMenu component', async () => {
    const mockItems = [
      {
        itemName: 'Starter1',
        itemDescription: 'Description for Starter1',
        itemPrice: 9.99,
        itemImage: '/images/starter1.jpg',
        itemType: 'starter',
        itemAvailability: 'in-stock',

      },
      {
        itemName: 'MainCourse1',
        itemDescription: 'Description for MainCourse1',
        itemPrice: 19.99,
        itemImage: '/images/mainCourse1.jpg',
        itemType: 'mainCourse',
        itemAvailability: 'in-stock',
      },
      {
        itemName: 'Dessert1',
        itemDescription: 'Description for Dessert1',
        itemPrice: 7.99,
        itemImage: '/images/dessert1.jpg',
        itemType: 'dessert',
        itemAvailability: 'in-stock',
      },
    ];

    axios.get.mockResolvedValue({ data: mockItems });

    var {getByText}=render(
        <BrowserRouter>
            <AdminMenu />
        </BrowserRouter>);
    await waitFor(() => {
      expect(getByText('Starters')).toBeInTheDocument();
    });
    mockItems.forEach((item) => {
      const itemNameElement = getByText(item.itemName);
      expect(itemNameElement).toBeInTheDocument();
    });

  });


  it("AdminMenu Items Are Successfully Rendering", () => {
    var {getAllByText} =render(
        <BrowserRouter>
            <AdminMenu/>
        </BrowserRouter>);
    setTimeout(()=>{
        const elementswithmenu=getAllByText("Edit");
        expect(elementswithmenu.length).toBeGreaterThan(0);
        const elementswithmenu2=getAllByText("Delete");
        expect(elementswithmenu2.length).toBeGreaterThan(0);
    },5000);
    
    });


   it('Edits item price', async () => {
    const mockItem = {
      itemName: 'TestItem',
      itemDescription: 'Test Description',
      itemPrice: 10.99,
      itemImage: '/images/test.jpg',
      itemAvailability: 'in-stock',
      
    };
    axios.put.mockResolvedValue();

    var {getByText,getByRole,getByTestId} = render(<AdminItem item={mockItem} onDelete={() => {}} />);

    expect(getByText('TestItem')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('$ 10.99')).toBeInTheDocument();

    fireEvent.click(getByTestId("change-price"));
    fireEvent.change(getByRole('spinbutton'), { target: { value: '15.99' } });
    fireEvent.click(getByTestId("change-price"));
    
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `http://localhost:3001/menu/edit/${mockItem.itemName}`,
        {
          itemName: mockItem.itemName,
          itemDescription: mockItem.itemDescription,
          itemPrice: '15.99', 
          itemImage: mockItem.itemImage,
          itemAvailability: 'in-stock',
        }
      );
    });
    expect(getByText('$ 15.99')).toBeInTheDocument();
  });





it('Adds a new item to the database', async () => {
    
    axios.get.mockResolvedValue({ data: [] });

    var {getByText,getByTestId} =render(
        <BrowserRouter>
            <AdminMenu/>
        </BrowserRouter>);

    
    fireEvent.change(getByTestId('item-name-input'), {
      target: { value: 'Pizza' },
    });
    fireEvent.change(getByTestId('item-type-select'), {
      target: { value: 'starter' },
    });
    fireEvent.change(getByTestId('item-description-input'), {
      target: { value: 'Delicious pizza description' },
    });
    fireEvent.change(getByTestId('item-price-input'), {
      target: { value: '12' },
    });


    axios.post.mockResolvedValue({});

    // Submit the form
    fireEvent.click(getByTestId('add-item-button'));


    axios.get.mockResolvedValue({
      data: [
        {
          itemName: 'Pizza',
          itemDescription: 'Delicious pizza description',
          itemPrice: 12,
          itemImage: '',
          itemType: 'starter',
        },
      ],
    });

    
    await waitFor(() => {
        //checks if thhe form is empty
        expect(getByTestId('item-name-input')).toHaveValue('');
        expect(getByTestId('item-type-select')).toHaveValue('');
        expect(getByTestId('item-description-input')).toHaveValue('');
        expect(getByTestId('item-price-input')).toHaveValue(0);
        
        //once the form is confirmed to be empty it can check if new item is present
        expect(getByText('Pizza')).toBeInTheDocument();
        
      });
  });
  
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({});
    axios.delete.mockResolvedValue({});
  });


it('should delete an item when the delete button is clicked', async () => {

  axios.get.mockResolvedValueOnce({
    data: [
      {
        itemName: 'TestItem',
        itemDescription: 'Description2',
        itemPrice: 15,
        itemImage: 'image2.jpg',
        itemType: 'mainCourse',
        itemAvailability: 'in-stock',
      },
    ],
  });
  const itemName = 'TestItem'; 
  var {getByText,getByTestId,queryByText,getAllByText,getAllByTestId} =render(
        <BrowserRouter>
            <AdminMenu/>
        </BrowserRouter>);

    // Wait for the data to be loaded
    
    await waitFor(() => {
      expect(getByText(itemName)).toBeInTheDocument();
    });

    

    // Click the delete button
    fireEvent.click(getByTestId('delete-item'));
    
    // Wait for the delete request to be made
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:3001/menu/delete/${encodeURIComponent(itemName)}`
      );
    });

    expect(queryByText(itemName)).not.toBeInTheDocument();
  });
  
  
  it('Edit item stock from in-stock to out-of-stock', async () => {
    const mockItem = {
      itemName: 'TestItem',
      itemDescription: 'Test Description',
      itemPrice: 10.99,
      itemImage: '/images/test.png',
      itemAvailability: 'in-stock',
    };
    
    
    const mockOnDelete = jest.fn();
    
    axios.put.mockResolvedValueOnce({ data: {} });
  
    
    var {getByText,getByRole,getByTestId,getByLabelText} = render(<AdminItem item={mockItem} onDelete={() => {}} />);
  
    
    fireEvent.click(getByTestId('change-price'));
  
    
    const outOfStockRadioButton = getByLabelText('Out-of-Stock');
    fireEvent.click(outOfStockRadioButton);
  

    fireEvent.click(getByTestId('change-price'));
  
    
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `http://localhost:3001/menu/edit/${mockItem.itemName}`,
        {
          itemName: mockItem.itemName,
          itemDescription: mockItem.itemDescription,
          itemPrice: mockItem.itemPrice.toFixed(2),
          itemImage: mockItem.itemImage,
          itemAvailability: 'out-of-stock',
        }
      );
    });
  
  });
});




