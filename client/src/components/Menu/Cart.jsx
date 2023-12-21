// Cart.jsx


import React, { useEffect } from 'react';

function Cart({ items, quantityMap}) {
  // Calculate the number of unique items brought
  
  const cartItems = items.filter((item) => quantityMap[item.itemName] > 0);
  const uniqueItemsCount = cartItems.length;

  const formattedCart = cartItems.map((item) => `${item.itemName},${item.itemPrice},${quantityMap[item.itemName] }`);
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(formattedCart));
  }, [formattedCart]);
  
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <p>Number of Unique Items: {uniqueItemsCount}</p>
      <ul>
        {cartItems.map((item) => (
          <li key={item.itemName}>
            {item.itemName} - Quantity: {quantityMap[item.itemName]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
