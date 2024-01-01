import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';


function Cart({ items, quantityMap}) {
  const nav = useNavigate();

  const cartItems = items.filter((item) => quantityMap[item.itemName] > 0);
  const uniqueItemsCount = cartItems.length;
  const [isHovered, setIsHovered] = useState(false);

  const formattedCart = cartItems.map((item) => `${item.itemName},${item.itemPrice},${quantityMap[item.itemName] }`);
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(formattedCart));
  }, [formattedCart]);
  
  return (
    <>
    
    <div className="cart" style={{display:"flex",justifyContent:"space-between"}}
        
        >
      <div className ='cart-hover' onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
      <div className="cart-icon" style={{position:"fixed"}} title="Hover to view and proceed to basket">
        <img src="/images/Cart.png" alt="Shopping Cart" />
        <label className="unique-items-count">{uniqueItemsCount}</label>
        </div>
        {/* Show the list underneath the icon */}
        {isHovered && (
          <div className='cart-contents'>
          <div className="cart-items-list">
          
            {cartItems.map((item) => (
              <label key={item.itemName}>
              
                  {item.itemName} (x{quantityMap[item.itemName]})
              </label>
            ))}
            
          </div>
          <button onClick={() => nav("/basket")} >
              <b>View My Basket</b>
          </button>
          </div>
        )}
        </div>
        
      </div>
      
    
    </>
  );
}

export default Cart;
