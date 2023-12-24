
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import Cart from "./Cart";
import React from "react";
import "../App.css";
import NavBar from "../NavBar";
import Dashboard from "../User/Dashboard";
import Basket from "../Order/Basket";
import {useNavigate } from 'react-router-dom';
function Menu() {
  const nav = useNavigate();
  if(!sessionStorage.getItem("menuCart")){
    sessionStorage.setItem("menuCart","{}");
  }
  const [items, setItems] = useState([]);
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
  }, []);



sessionStorage.setItem("menuCart", JSON.stringify(quantityMap));

  
const updateItems = (itemName, itemImage,action) => {
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
  
  return (
    <div className="menu-everything" style={{
      display: "flex",
      flexDirection: "column",
      }}>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background-image: url("/images/MenuBackground2.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
        `}
      </style>
        
      <NavBar></NavBar>
      
      <div className="menu-header">
        <h1 align="center">Menu</h1>
      </div>
        <div className="menu-item-div">
          {items.map((item) => (
            <Item
              key={item.itemName}
              item={item}
              quantity={quantityMap[item.itemName] || 0}
              onAddToCart={() => updateItems(item.itemName, item.itemImage,"add")}
              onRemoveFromCart={() => updateItems(item.itemName, item.itemImage,"remove")}
            />
          ))}
        </div>
        <Cart items={items} quantityMap= {quantityMap}/>
    </div>
  
  );
};  

export default Menu;
