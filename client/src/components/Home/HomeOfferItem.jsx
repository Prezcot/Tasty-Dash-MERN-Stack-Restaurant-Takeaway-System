
import React, { useEffect, useState } from 'react';

function HomeOfferItem({ item, quantity, onAddToCart, onRemoveFromCart }) {
  return (
    <div className="menu-card">
   <div style={{width: '100%', height: '100%', marginBottom:"5%"}}>
    <img src={item.itemImage} alt={item.itemName} style={{borderRadius:"2%",width: 'inherit', height: 'inherit', objectFit: 'cover'}}/>
   </div>
    
      <div className="menu-info">
        <h4 align='center'>{item.itemName}</h4>
      </div>
      <div>
        <p>{item.itemDescription}</p>
      </div>
      <div>
        <p align='center' style={{fontSize:'130%', fontWeight:'bold'}}>$ {item.itemPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default HomeOfferItem;
