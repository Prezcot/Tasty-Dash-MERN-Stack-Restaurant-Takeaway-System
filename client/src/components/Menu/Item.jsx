
import React, { useEffect, useState } from 'react';

function Item({ item, quantity, onAddToCart, onRemoveFromCart }) {
  const [localQuantity, setLocalQuantity] = useState();

  useEffect(() => {
    
    setLocalQuantity(quantity);
  }, [quantity]);

  const handleAddToCart = () => {
    setLocalQuantity((prevQuantity) => prevQuantity + 1);
    onAddToCart(); 
  };

  const handleRemoveFromCart = () => {
    if (localQuantity > 0) {
      setLocalQuantity((prevQuantity) => prevQuantity - 1);
      onRemoveFromCart(); 
    }
  };

  return (
    <div className="menu-card">
      <div className="menu-card-image">
      <img src={item.itemImage} alt={item.itemName}/>
      </div>
      <div className="menu-info">
        <h3>{item.itemName}</h3>
        <p>{item.itemDescription}</p>
        <p>Price: Rs. {item.itemPrice.toFixed(2)}</p>
      </div>
      <div className="menu-actions">
          <button className="remove-from-cart" onClick={handleRemoveFromCart}>
          <b>&nbsp; - &nbsp;</b>
          </button>
          <label className="quantity-in-cart">{localQuantity}</label>
          <button className="add-to-cart" onClick={handleAddToCart}>
           <b>&nbsp; + &nbsp;</b>
          </button>
      </div>
    </div>
  );
}

export default Item;
