import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import Cart from "./Cart";
import React from "react";
import "../App.css";
import NavBar from "../NavBar";
import Dashboard from "../User/Dashboard";
import Basket from "../Order/Basket";
import { io } from "socket.io-client";
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Menu() {
  const nav = useNavigate();
  if(!sessionStorage.getItem("menu_cart")){
    sessionStorage.setItem("menu_cart","{}");
  }
  const [items, setItems] = useState([]);
  const [has_toast_appeared, setHasToastAppeared] = useState(false);
  const [quantity_map, setQuantityMap] = useState(JSON.parse(sessionStorage.getItem("menu_cart")));

  var grabitems = async () => {
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
  };
  
  useEffect(() => {
    grabitems();
    
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("product changes", () => {
      grabitems();
    });
    return () => {
      socket.disconnect();
    };
  }, []);




sessionStorage.setItem("menu_cart", JSON.stringify(quantity_map));

  
const updateItems = (itemName, itemImage,action) => {
    setQuantityMap((prev_map) => {
      const current_quantity = prev_map[itemName] || 0;
      const new_quantity =
        action === "add" ? current_quantity + 1 : Math.max(currentQuantity - 1, 0);

        const updated_map = new_quantity === 0
        ? Object.fromEntries(Object.entries(prev_map).filter(([key]) => key !== itemName))
        : { ...prev_map, [itemName]: new_quantity };
      showBasket();
      return updated_map;
    });
  };
  
function showBasket(){
  if (!has_toast_appeared) {
    toast.info('View your basket here   ➜', {
      className : 'toast-position',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    
    setHasToastAppeared(true);
  }
  };

return (
  <>
  <NavBar style={{postion:"fixed"}}></NavBar>
  <div className="menu-everything" style={{
    display: "flex",
    flexDirection: "column",
    paddingTop: '4%',
    marginTop: '0%'
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
        quantity={quantity_map[item.itemName] || 0}
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
        quantity={quantity_map[item.itemName] || 0}
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
        quantity={quantity_map[item.itemName] || 0}
        onAddToCart={() => updateItems(item.itemName, item.itemImage, "add")}
        onRemoveFromCart={() => updateItems(item.itemName, item.itemImage, "remove")}
      />
    ))}
  </div>
  
  <Cart items={items} quantity_map={quantity_map}  data-testid="cart-icon"/>
</div>

</>
  
  );
};  

export default Menu;