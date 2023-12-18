// Cart.jsx

import React from 'react';

function Cart({ items }) {
  // Calculate the number of unique items brought
  const uniqueItemsCount = items.filter((item) => item.quantity > 0).length;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <p>Number of Unique Items: {uniqueItemsCount}</p>
      <ul>
        {items.map((item) => (
          <li key={item.itemId}>
            {item.itemName} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
