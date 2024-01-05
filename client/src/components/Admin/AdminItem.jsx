// AdminItem.jsx
import React, { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";


function AdminItem({ item, onDelete }) {
  const [is_Editing, setIsEditing] = useState(false);
  const [edited_Price, setEditedPrice] = useState(item.itemPrice.toFixed(2));
  const [stock_Status, setStockStatus] = useState(item.itemAvailability);
  const [edit_text, setEdittext] = useState("/images/Edit.png");

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const handleStockStatusChange = (e) => {

    setStockStatus(e.target.value);
  };
  
  const handleEditClick = async () => {
    if (is_Editing) {
      let setNewItemData = {
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemPrice: edited_Price,
        itemImage: item.itemImage,
        itemAvailability: stock_Status,
      };
      await axios.put(`http://localhost:3001/menu/edit/${setNewItemData.itemName}`, setNewItemData);
      setEdittext("/images/Edit.png");
      setIsEditing(false);
      const socket = io("http://localhost:3001");
      socket.emit("product changes");
    } else {
      // Enter edit mode
      setEdittext("/images/Apply.png");
      setIsEditing(true);
    }
  };
  const cardStyle = {
    backgroundColor: stock_Status === "in-stock" ? "#32383f" : "darkred",
  };

  return (
    <div className="menu-card" data-testid="menu-item" style={cardStyle}>
      
      <img src={item.itemImage} alt={item.itemName} />
      <div className="menu-info">
        <h3 align="center" style={{ fontWeight: "600" }}>
          {item.itemName}
        </h3>
        <p align="center">{item.itemDescription}</p>
        {is_Editing && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <label>
              <input
                type="radio"
                value="in-stock"
                checked={stock_Status === "in-stock"}
                onChange={handleStockStatusChange}
              />
              In-Stock
            </label>
            <label>
              <input
                type="radio"
                value="out-of-stock"
                checked={stock_Status === "out-of-stock"}
                onChange={handleStockStatusChange}
              />
              Out-of-Stock
            </label>
          </div>
        )}
        <p align="center" style={{ fontSize: "130%", fontWeight: "bold" }}>
          {is_Editing ? (
            <input type="number" step="0.01" value={edited_Price} onChange={handlePriceChange} />
          ) : (
            `$ ${edited_Price}`
          )}
        </p>
      </div>
      <div className="menu-actions">
        <div className="quantity">
          <img
            src={edit_text}
            className="edit-button"
            data-testid="change-price"
            onClick={handleEditClick}
            style={{ height: "45px", width: "80px" }}
          />
        </div>
        <img
          src="/images/Delete.png"
          className="delete-button"
          data-testid="delete-item"
          onClick={onDelete}
          style={{ height: "45px", width: "80px" }}
        />
      </div>
    </div>
  );
}

export default AdminItem;