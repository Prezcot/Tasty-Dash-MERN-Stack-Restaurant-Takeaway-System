import AdminItem from "./AdminItem";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "../App.css";


function AdminMenu() {
    const [items, setItems] = useState([]);
    const [newItemData, setNewItemData] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice: 0,
        itemImage: '', // Store the selected file here
      });

    useEffect(() => {
        axios
          .get("http://localhost:3001/menu/data")
          .then((response) => {
            const data = response.data;
            setItems(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
    
      // Callback function to update the items array
      const updateItems = (itemId, action) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.itemId === itemId
              ? {
                  ...item,
                  quantity:
                    action === "add" ? item.quantity + 1 : item.quantity - 1,
                }
              : item
          )
        );
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItemData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    // Callback function to update the items array
    const handleFileChange = (e) => {
        const file = e.target.files[0];
      
        if (file) {
          const reader = new FileReader();
      
          reader.onloadend = () => {
            // reader.result is a base64-encoded string
            setNewItemData((prevData) => ({
              ...prevData,
              itemImage: reader.result,
            }));
          };
      
          reader.readAsDataURL(file);
        } else {
          setNewItemData((prevData) => ({
            ...prevData,
            itemImage: null,
          }));
        }
      };
      
    
      // Function to add a new item
      const addNewItem = async () => {
        try {
          const newItem = {
            itemId:items.length + 1,
            itemName: newItemData.itemName,
            itemDescription: newItemData.itemDescription,
            itemPrice: newItemData.itemPrice,
            itemImage: newItemData.itemImage,
            quantity:0,
          };
      
          await axios.post('http://localhost:3001/menu/add', newItem);
      
          // After adding the new item, fetch updated data
          const updatedItemsResponse = await axios.get('http://localhost:3001/menu/data');
          setItems(updatedItemsResponse.data);
      
          // Clear the new item form
          setNewItemData({
            itemName: '',
            itemDescription: '',
            itemPrice: 0,
            itemImage: '',
          });
        } catch (error) {
          console.error(error);
        }
      };
  
    return (
      <>
      {items.map((item) => (
        <AdminItem
          item={item}
        />
      ))}
      <div>
        <h2>Add New Item</h2>
        <form encType="multipart/form-data">
          <label>
            Item Name:
            <input
              type="text"
              name="itemName"
              value={newItemData.itemName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Item Description:
            <textarea
              name="itemDescription"
              value={newItemData.itemDescription}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Item Price:
            <input
              type="number"
              step="0.01"  // Allow decimal values
              name="itemPrice"
              value={newItemData.itemPrice}
              onChange={handleInputChange}
              />
          </label>
          <label>
            Item Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button type="button" onClick={addNewItem}>
            Add Item
          </button>
        </form>
      </div>
      </>
    );
  }
  
  export default AdminMenu;