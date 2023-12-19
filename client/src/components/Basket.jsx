import React from "react";
import Product from "./Product";
import SummaryItem from "./SummaryItem";

function Basket(){


    let instruction = "";


    //Thinals side
    // let thinalcart = ["Pizza,600,1","Pebbles,400,3","Lava Cake,200,2"];
    // localStorage.setItem("cart",JSON.stringify(thinalcart));


    //my side
    let cart = JSON.parse(localStorage.getItem("cart"));

    //setter variable
    localStorage.setItem("wonder","false");

    function setInstructions(e){
        instruction = e.target.value;
    }

    return(
        <>
        <div className="navbar"></div>

        <div className="header">
        <h1 className="title">Your Basket</h1>
            <div id="tomenu">
            <img id="arrow" src="Arrow.png" width="50px" height="15px"/>
            <button id="menu-button">Back to Menu</button>
            </div>
        </div>

        <div className="container">
            <div className="basket">
                <div className="confirm">
                    <h2 className="textcolor">Confirm your order</h2>
                    {cart.map((item,index)=>(
                        <Product itemProp={item} indexProp={index} cartProp={cart}/>
                    ))}
                    
                    <div className="instruction">
                        <h3 className="textcolor">Special Instructions for Preparation</h3>
                        <textarea className="textarea" onChange={setInstructions}></textarea>
                    </div>
                </div>

                <div className="summary">
                    <h2 className="textcolor">Order Summary</h2>
                    <SummaryItem/>
                    <div className="finalize">
                        <div id="indi-detail">
                            <p className="textcolor">Total</p>
                            <p className="textcolor">Rs.1800</p>
                        </div>
                        <button id="payment-button">Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Basket;