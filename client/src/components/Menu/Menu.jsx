
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Menu() {
  const nav = useNavigate();
  if(!sessionStorage.getItem("menuCart")){
    sessionStorage.setItem("menuCart","{}");
  }
  const [items, setItems] = useState([]);
  const [hasToastAppeared, setHasToastAppeared] = useState(false);
  const [quantityMap, setQuantityMap] = useState(JSON.parse(sessionStorage.getItem("menuCart")));
  
  useEffect(() => {
    try{
      axios
        .get("http://localhost:3001/menu/data")
        .then((response) => {
          const data = response.data;
          setItems(data);
        })
        .catch((error) => {
          console.error(error);
        });
      }catch{
        console.log("error");
      }
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
      showBasket();
      return updatedMap;
    });
  };
  
function showBasket(){
  if (!hasToastAppeared) {
    toast.info('View your basket here   ➜', {
      className: 'toast-position',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    // Set the state to true once the toast has appeared
    setHasToastAppeared(true);
  }
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
        background-image: url("/images/MenuBackground.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
      }
      h1, h2 {
        color: white;
      }
    `}
  </style>

  <NavBar style={{postion:"fixed"}}></NavBar>
  <ToastContainer />
  <div className="menu-header">
    <h1 align="center">Menu</h1>
  </div>

  {/* Separate items based on their types */}
  <h2>Starters</h2>
  
  <div className="menu-item-div">
    
    {items.filter(item => item.itemType === 'starter').map(item => (
      <Item
        key={item.itemName}
        item={item}
        quantity={quantityMap[item.itemName] || 0}
        onAddToCart={() => updateItems(item.itemName, item.itemImage, "add")}
        onRemoveFromCart={() => updateItems(item.itemName, item.itemImage, "remove")}
      />
    ))}
  </div>
  <h2>Main Courses</h2>
  <br></br>
  <div className="menu-item-div">
    {items.filter(item => item.itemType === 'mainCourse').map(item => (
      <Item
        key={item.itemName}
        item={item}
        quantity={quantityMap[item.itemName] || 0}
        onAddToCart={() => updateItems(item.itemName, item.itemImage, "add")}
        onRemoveFromCart={() => updateItems(item.itemName, item.itemImage, "remove")}
      />
    ))}
  </div>
  <h2>Desserts</h2>
  <br></br>
  <div className="menu-item-div">
    {items.filter(item => item.itemType === 'dessert').map(item => (
      <Item
        key={item.itemName}
        item={item}
        quantity={quantityMap[item.itemName] || 0}
        onAddToCart={() => updateItems(item.itemName, item.itemImage, "add")}
        onRemoveFromCart={() => updateItems(item.itemName, item.itemImage, "remove")}
      />
    ))}
  </div>

  <Cart items={items} quantityMap={quantityMap}  data-testid="cart-icon"/>
</div>

  
  );
};  

export default Menu;
