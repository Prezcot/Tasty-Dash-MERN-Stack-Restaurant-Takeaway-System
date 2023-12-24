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
      <div className="menu-everything" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url("/images/MenuBackground2.jpg")`,
        backgroundSize:"cover",
        }}>
      
      <div className="item-form-container"style={{
        marginTop: "4%"
        }}>
      <h2 className="form-title">Add New Item</h2>
      <form onSubmit={addNewItem} className="item-form">
        <div className="form-group">
          <label htmlFor="itemName" className="form-label">
            Item Name:
          </label>
          <input
            type="text"
            name="itemName"
            value={newItemData.itemName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemDescription" className="form-label">
            Item Description:
          </label>
          <textarea
            name="itemDescription"
            value={newItemData.itemDescription}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemPrice" className="form-label">
            Item Price:
          </label>
          <input
            type="number"
            step="0.01"
            name="itemPrice"
            value={newItemData.itemPrice}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemImage" className="form-label">
            Item Image:
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">
          Add Item
        </button>
      </form>
    </div>
      <div className="menu-item-div">
      {items.map((item) => (
        <AdminItem
        key={item.itemName}
        item={item}
        onDelete={() => deleteItem(item.itemName)}
        
      />
      ))}</div>
      
      </div>
      </>
    );
  }
  
  export default AdminMenu;