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
                <img src="/images/default.png" width="50px" height="50px"/>
                <b><label>{name}</label></b>
                <b><label>${price} each</label></b>
                <div className="counter">
                    <img name="minus" src="/images/Minus.png" className="counter-button" onClick={(e)=>handleQuantity(e)}/>
                    <div id="counter-number">
                    <b><label class="counter-quantity">{quantity}</label></b>
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
