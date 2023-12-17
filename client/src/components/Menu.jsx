// Menu.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Item from './Item';
import Cart from './Cart';
import React from 'react';
import '../App.css';

function Menu() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/menu/data')
      .then(response => {
        const data = response.data;
        setItems(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Callback function to update the items array
  const updateItems = (itemId, action) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: action === 'add' ? item.quantity + 1 : item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <>
      {items.map((item) => (
        <Item
          item={item}
          onAddToCart={() => updateItems(item.itemId, 'add')}
          onRemoveFromCart={() => updateItems(item.itemId, 'remove')}
        />
      ))}
      <Cart items={items} />
    </>
  );
}

export default Menu;