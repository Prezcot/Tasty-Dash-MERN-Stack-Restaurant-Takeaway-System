import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
function Cart({ items, quantityMap}) {
  const nav = useNavigate();
  // Calculate the number of unique items brought
  
  const cartItems = items.filter((item) => quantityMap[item.itemName] > 0);
  const uniqueItemsCount = cartItems.length;

  const formattedCart = cartItems.map((item) => `${item.itemName},${item.itemPrice},${quantityMap[item.itemName] }`);
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(formattedCart));
  }, [formattedCart]);
  
  return (
    <div className="cart" style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
      <div class="cart-icon">
        <img src="/images/carticon.png" alt="Shopping Cart"/>
        <span class="unique-items-count">{uniqueItemsCount}</span>
      </div>
      <ul class="cart-items-list">
        {cartItems.map((item) => (
          <li key={item.itemName}>
            {item.itemName} - Quantity: {quantityMap[item.itemName]}
          </li>
        ))}
      </ul>
      <button onClick={()=>nav("/basket")} style={{color:"black"}}>View My Basket</button>
    </div>
  );
}

export default Cart;
