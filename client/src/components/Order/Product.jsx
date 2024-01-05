import React from "react";
import { useState } from "react";

function Product ({item_prop,index_prop, cart_prop, update_prop, quantity_prop}){

    let [name, price, qty] = item_prop.split(",");
    console.log("full cart"+cart_prop);
    console.log("first entry"+cart_prop[0]);

    let [quantity,setQuantity] = useState(parseInt(qty));

    function handleQuantity(e){
        if(e.target.name=="minus" && quantity > 0){
            update_prop();
            setQuantity(quantity=quantity-1);
            cart_prop[index_prop] = name+","+price+","+(JSON.stringify(quantity));
            quantity_prop[name] = quantity;
            sessionStorage.setItem("cart",JSON.stringify(cart_prop));
            sessionStorage.setItem("menu_cart", JSON.stringify(quantity_prop));
            console.log("changedItem"+cart_prop[index_prop]);
            
        };
        if(e.target.name=="plus"){
            update_prop();
            setQuantity(quantity=quantity+1);
            cart_prop[index_prop] = name+","+price+","+(JSON.stringify(quantity));
            quantity_prop[name] = quantity;
            sessionStorage.setItem("cart",JSON.stringify(cart_prop));
            sessionStorage.setItem("menu_cart", JSON.stringify(quantity_prop));
            console.log("changedItem"+cart_prop[index_prop]);
            
        };
    }

    // let thinalcart = ["Pizza,600,1","Pebbles,400,3","Lava Cake,200,2"];
    
    if (quantity > 0) {
        return(
            <div className="item">
                <div style={{border:"3px solid black", padding:"1%", borderRadius:"10px"}}>
                <img src="/images/default.png" width="40px" height="40px" id="item-image"/>
                </div>
                <b><label>{name}</label></b>
                <b><label>${price} each</label></b>
                <div className="counter">
                    <img name="minus" data-testid="minus-button" src="/images/Minus.png" className="counter-button" onClick={(e)=>handleQuantity(e)}/>
                    <div id="counter-number">
                    <b><label class="counter-quantity">{quantity}</label></b>
                    </div>
                    <img name="plus" data-testid="plus-button" src="/images/Plus.png" className="counter-button" onClick={(e)=>handleQuantity(e)}/>
                </div>
            </div>
        );
    } else {
        
        return null;
    }
}

export default Product;
