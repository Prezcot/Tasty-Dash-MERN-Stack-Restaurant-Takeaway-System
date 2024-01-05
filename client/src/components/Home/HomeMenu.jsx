import react from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { io } from "socket.io-client";
import "../../BootstrapImports.js";
import HomeOfferItem from "./HomeOfferItem.jsx";
function HomeMenu(){
    const nav=useNavigate();

    const [items, setItems] = useState([]);

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
    return(
    <>
    <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100vw", paddingTop:"6%"}}>
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
            <nav class="py-3 navbar navbar-expand-lg fixed-top auto-hiding-navbar">
                <div class="container">
                    <a class="navbar-brand">
                        <img src="/images/logo.jpg" class="logo" height="50px"/> <label style={{color:"white"}}>Tasty Dash</label>
                    </a>
                    <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul style={{cursor:"pointer"}} class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" onClick={()=>{nav("/home")}}>Home</a>         
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=>{nav("/signin")}}>Log in</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=>{nav("/signup")}}>Sign up!</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

            <div style={{padding:"3%"}}>
            <h1 style={{color:"white"}}>Our Offerings</h1><br/>
            <h2 style={{color:"white"}}>Starters</h2>
            <div className="menu-item-div">
                
                {items.filter(item => item.itemType === 'starter').map(item => (
                <HomeOfferItem
                    key={item.itemName}
                    item={item}
                />
                ))}
            </div>
            <h2 style={{color:"white"}}>Main Courses</h2>
            <br></br>
            <div className="menu-item-div">
                {items.filter(item => item.itemType === 'mainCourse').map(item => (
                <HomeOfferItem
                    key={item.itemName}
                    item={item}
                />
                ))}
            </div>
            <h2 style={{color:"white"}}>Desserts</h2>
            <br></br>
            <div className="menu-item-div">
                {items.filter(item => item.itemType === 'dessert').map(item => (
                <HomeOfferItem
                    key={item.itemName}
                    item={item}
                />
                ))}
            </div>
        </div>
    </div>
            </>
);
}

export default HomeMenu;