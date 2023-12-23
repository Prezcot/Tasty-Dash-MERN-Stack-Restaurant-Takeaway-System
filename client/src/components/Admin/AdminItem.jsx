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
          <h3>{item.itemName}</h3>
          <p>{item.itemDescription}</p>
          <p>{isEditing ? (
            <input
              type="number"
              step="0.01"
              value={editedPrice}
              onChange={handlePriceChange}
            />
          ) : (
            `Price: Rs. ${editedPrice}`
          )}</p>
        </div>
        <div className="menu-actions">
          <div className="quantity">
            <button className="remove-from-cart" onClick={handleEditClick}>{edittext}</button>
          </div>
          <button className="add-to-cart" onClick={onDelete}>Delete</button>
        </div>
      </div>
    );
  }
  export default AdminItem;