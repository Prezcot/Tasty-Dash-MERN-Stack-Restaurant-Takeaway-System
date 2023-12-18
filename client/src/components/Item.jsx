// Item.jsx

import React, { useState } from 'react';


function Item({ item, onAddToCart, onRemoveFromCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    onAddToCart(); // Notify the parent component about the add action
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onRemoveFromCart(); // Notify the parent component about the remove action
    }
  };

  return (
    <div className="menu-card">
      <img src={"./images/" + item.itemImage}/>
      <div className="menu-info">
        <h3>{item.itemName}</h3>
        <p>{item.itemDescription}</p>
        <p>Price: ${item.itemPrice.toFixed(2)}</p>
      </div>
      <div className="menu-actions">
        <div className="quantity">
          <button className="remove-from-cart" onClick={handleRemoveFromCart}>
            -
          </button>
          <span className="quantity-in-cart">{item.quantity}</span>
          <button className="add-to-cart" onClick={handleAddToCart}>
            +
          </button>
        </div>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}

export default Item;
