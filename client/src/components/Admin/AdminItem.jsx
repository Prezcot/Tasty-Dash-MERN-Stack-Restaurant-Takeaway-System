// AdminItem.jsx
import React, { useState } from "react";
import axios from "axios";
function AdminItem({ item, onDelete, onEdit}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(item.itemPrice);
  const [edittext, setEdittext] = useState("Edit");
  
  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const handleEditClick = async () => {
    if (isEditing) {
      let setNewItemData = ({
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemPrice: editedPrice,
        itemImage: item.itemImage,
      });
      await axios.put(`http://localhost:3001/menu/edit/${setNewItemData.itemName}`, setNewItemData);
      setEdittext("Edit");
      setIsEditing(false);
    } else {
      // Enter edit mode
      setEdittext("Apply");
      setIsEditing(true);
    }
  };
    return (
      <div className="menu-card">
        <img src={item.itemImage} alt={item.itemName} />
        <div className="menu-info">
          <h3 align='center' style={{fontWeight:'600'}}>{item.itemName}</h3>
          <p align='center'>{item.itemDescription}</p>
          <p align='center' style={{fontSize:'130%', fontWeight:'bold'}}>{isEditing ? (
            <input
              type="number"
              step="0.01"
              value={editedPrice}
              onChange={handlePriceChange}
            />
          ) : (
            `$ ${editedPrice}`
          )}</p>
        </div>
        <div className="menu-actions">
          <div className="quantity">
            <button className="edit-button" onClick={handleEditClick}>{edittext}</button>
          </div>
          <button className="delete-button" onClick={onDelete}>Delete</button>
        </div>
      </div>
    );
  }
  export default AdminItem;