import React from "react";
import { useState } from "react";

function Product ({itemProp,indexProp, cartProp}){

    let [name, price, qty] = itemProp.split(",");
    console.log("full cart"+cartProp);
    console.log("first entry"+cartProp[0]);

    let [quantity,setQuantity] = useState(parseInt(qty));

    function handleQuantity(e){
        if(e.target.name=="minus"){
            setQuantity(quantity=quantity-1);
            cartProp[indexProp] = name+","+price+","+(JSON.stringify(quantity));
            localStorage.setItem("cart",JSON.stringify(cartProp));
            console.log("changedItem"+cartProp[indexProp]);
        };
        if(e.target.name=="plus"){
            setQuantity(quantity=quantity+1);
            cartProp[indexProp] = name+","+price+","+(JSON.stringify(quantity));
            localStorage.setItem("cart",JSON.stringify(cartProp));
            console.log("changedItem"+cartProp[indexProp]);
        };
    }

    // let thinalcart = ["Pizza,600,1","Pebbles,400,3","Lava Cake,200,2"];
    


    return(
        <div className="item">
            <img src="Biryani.png" width="130px" height="106px"/>
            <p>{name}</p>
            <p>Rs.{price} each</p>
            <div className="counter">
                <img name="minus" src="Minus.png" className="counter-button" onClick={(e)=>handleQuantity(e)}/>
                <div id="counter-number">
                <p>{quantity}</p>
                </div>
                <img name="plus" src="Plus.png" className="counter-button" onClick={(e)=>handleQuantity(e)}/>
            </div>
        </div>
    );
}

export default Product;