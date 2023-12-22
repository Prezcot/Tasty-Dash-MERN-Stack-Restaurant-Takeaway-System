import AdminItem from "./AdminItem";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "../App.css";


function AdminMenu() {
    const [items, setItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const fileInput = React.useRef();
    const [newItemData, setNewItemData] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice: 0,
        itemImage: '', 
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
      const addNewItem = async (event) => {
        event.preventDefault();
        try {
          const newItem = {
            itemName: newItemData.itemName,
            itemDescription: newItemData.itemDescription,
            itemPrice: newItemData.itemPrice,
            itemImage: newItemData.itemImage,
          };
      
          await axios.post('http://localhost:3001/menu/add', newItem);
      
          // After adding the new item, fetch updated data
          const updatedItemsResponse = await axios.get('http://localhost:3001/menu/data');
          setItems(updatedItemsResponse.data);
      
          setNewItemData({
            itemName: '',
            itemDescription: '',
            itemPrice: 0,
            itemImage: '',
          });
          fileInput.current.value = '';
        } catch (error) {
          console.error(error);
        }
      };
      const deleteItem = async (itemName) => {
        try {
        
          const encodedItemName = encodeURIComponent(itemName);
      
          await axios.delete(`http://localhost:3001/menu/delete/${encodedItemName}`);
      
          const updatedItemsResponse = await axios.get('http://localhost:3001/menu/data');
          setItems(updatedItemsResponse.data);
        } catch (error) {
          console.error(error);
        }
      };
    return (
      <>
      {items.map((item) => (
        <AdminItem
        key={item.itemName}
        item={item}
        onDelete={() => deleteItem(item.itemName)}
        
      />
      ))}
      <div>
        <h2>Add New Item</h2>
        <form onSubmit={addNewItem} >
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
              ref={fileInput}
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">
            Add Item
          </button>
        </form>
      </div>
      </>
    );
  }
  
  export default AdminMenu;