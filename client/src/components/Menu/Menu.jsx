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
  if(!sessionStorage.getItem("menuCart")){
    sessionStorage.setItem("menuCart","{}");
  }
  const [items, setItems] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [quantityMap, setQuantityMap] = useState(JSON.parse(sessionStorage.getItem("menuCart")));

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
}, []); // Only run this effect when the component mounts


sessionStorage.setItem("menuCart", JSON.stringify(quantityMap));
  // Callback function to update the items array
const updateItems = (itemName, action) => {
    setQuantityMap((prevMap) => {
      const currentQuantity = prevMap[itemName] || 0;
      const newQuantity =
        action === "add" ? currentQuantity + 1 : Math.max(currentQuantity - 1, 0);

        const updatedMap = newQuantity === 0
        ? Object.fromEntries(Object.entries(prevMap).filter(([key]) => key !== itemName))
        : { ...prevMap, [itemName]: newQuantity };
  
      return updatedMap;
    });
  };
  
  if (showDashboard) {
    return <Dashboard></Dashboard>;
  }

  return (
    <>
      <NavBar onDashboardClick={() => setShowDashboard(true)}></NavBar>
      {items.map((item) => (
        <Item
          key={item.itemName}
          item={item}
          quantity={quantityMap[item.itemName] || 0}
          onAddToCart={() => updateItems(item.itemName, "add")}
          onRemoveFromCart={() => updateItems(item.itemName, "remove")}
        />
      ))}
      <Cart items={items} quantityMap= {quantityMap}/>
    </>
  );
}

export default Menu;
