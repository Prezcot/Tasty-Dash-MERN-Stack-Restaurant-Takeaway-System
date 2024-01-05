import react from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { io } from "socket.io-client";
import "../../BootstrapImports.js";
import HomeOfferItem from "./HomeOfferItem.jsx";
function Home(){
    const nav=useNavigate();

    return(
        <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100vw"}}>
            <nav class="py-3 navbar navbar-expand-lg fixed-top auto-hiding-navbar">
                <div class="container">
                    <a class="navbar-brand">
                        <img src="/images/logo.jpg" class="logo" height="50px" /> <label style={{color:"white"}}>Tasty Dash</label>
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
            <section id="hero">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <h1 style={{fontWeight:"bolder"}}>Taste<br />Redefined</h1>
                            <p>
                            Tasty Dash is a multi-cultural restaurant bringing in a wide range of meals that you can choose from by the finest 3-star michelin awarded chefs in Sri Lanka.
                            </p>
                            <button type="button" class="btn btn-dark btn-lg ordernow" onClick={()=>{sessionStorage.setItem("alert_msg","Please Sign In/Create An Account To Order")
                            nav("/signin")}}>
                            Order Now
                            </button>

                            <button type="button" class="btn btn-dark btn-lg ordernow" onClick={()=>{sessionStorage.setItem("AlertMsg","Please Sign In/Create An Account To Order")
                            nav("/offerings")}} style={{backgroundColor:"#f85606", marginTop:"2%", color:"black"}}>
                            Check out our menu ➤
                            </button>
                            

                            
                        </div>
                        <div class="col img-col">
                            <img src="" alt="" class="img-fluid"/>
                        </div>
                    </div>
                    <div class="row"></div>
                </div>
            </section>
            <div class="foot" style={{borderTop:"5px solid #F85606"}}>
                <div style={{paddingTop:"2vh",marginLeft:"15vw",marginRight:"15vw",display:"flex",flexDirection:"row",justifyContent:"space-between",color:"white"}}>
                    <div>
                        <h4>Opening Hours</h4>
                        <p>
                        Monday - Friday<br />
                        9:00 AM - 11:00 PM
                        </p>
                    </div>
                    <div>
                        <h4>Address</h4>
                        <p>
                        123, Galle Road,<br />
                        Colombo 03
                        </p>
                    </div>
                    <div>
                        <h4>Phone</h4>
                        <p>
                        +94 11 123 4567<br />
                        +94 11 123 4567
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;