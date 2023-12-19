// Menu.js
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import Cart from "./Cart";
import React from "react";
import "../App.css";
import NavBar from "../NavBar";
import Dashboard from "../User/Dashboard";
function Menu() {
  const [items, setItems] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu/data")
      .then((response) => {
        const data = response.data;
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Callback function to update the items array
  const updateItems = (itemName, action) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.itemName === itemName
          ? {
              ...item,
              quantity:
                action === "add" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      )
    );
  };
  if (showDashboard) {
    return <Dashboard></Dashboard>;
  }

  const toggleDashboard = () => {
    setShowDashboard(true);
  };
  return (
    <>
      <NavBar onDashboardClick={()=>setShowDashboard(true)}></NavBar>
      {items.map((item) => (
        <Item
          item={item}
          onAddToCart={() => updateItems(item.itemName, "add")}
          onRemoveFromCart={() => updateItems(item.itemName, "remove")}
        />
      ))}
      <Cart items={items} />
    </>
  );
}

export default Menu;
