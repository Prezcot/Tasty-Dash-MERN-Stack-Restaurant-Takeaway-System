import React from "react";
import { useState } from "react";

function Product ({itemProp,indexProp, cartProp, updateProp, quantityProp}){

    let [name, price, qty] = itemProp.split(",");
    console.log("full cart"+cartProp);
    console.log("first entry"+cartProp[0]);

    let [quantity,setQuantity] = useState(parseInt(qty));

    function handleQuantity(e){
        if(e.target.name=="minus" && quantity > 0){
            updateProp();
            setQuantity(quantity=quantity-1);
            cartProp[indexProp] = name+","+price+","+(JSON.stringify(quantity));
            quantityProp[name] = quantity;
            sessionStorage.setItem("cart",JSON.stringify(cartProp));
            sessionStorage.setItem("menuCart", JSON.stringify(quantityProp));
            console.log("changedItem"+cartProp[indexProp]);
            
        };
        if(e.target.name=="plus"){
            updateProp();
            setQuantity(quantity=quantity+1);
            cartProp[indexProp] = name+","+price+","+(JSON.stringify(quantity));
            quantityProp[name] = quantity;
            sessionStorage.setItem("cart",JSON.stringify(cartProp));
            sessionStorage.setItem("menuCart", JSON.stringify(quantityProp));
            console.log("changedItem"+cartProp[indexProp]);
            
        };
    }

    // let thinalcart = ["Pizza,600,1","Pebbles,400,3","Lava Cake,200,2"];
    
    if (quantity > 0) {
        return(
            <div className="item">
                <img src="/images/Biryani.png" width="130px" height="106px"/>
                <label>{name}</label>
                <label>Rs.{price} each</label>
                <div className="counter">
                    <img name="minus" src="/images/Minus.png" className="counter-button" onClick={(e)=>handleQuantity(e)}/>
                    <div id="counter-number">
                    <label class="counter-quantity">{quantity}</label>
                    </div>
                    <img name="plus" src="/images/Plus.png" className="counter-button" onClick={(e)=>handleQuantity(e)}/>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Product;
