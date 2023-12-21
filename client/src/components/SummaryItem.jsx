import React from "react";

function SummaryItem ({itemProp2, indexProp2, cartProp2}){

    let [name2, price2, qty2] = itemProp2.split(",");
    let totalPrice = parseInt(price2)*parseInt(qty2);

    if(qty2>0)
    {
    return(
        <div className="details">
            <div id="indi-detail">
                <div>
                <p className="textcolor">{name2} (x {qty2})</p>
                </div>

                <div>
                <p className="textcolor">{totalPrice}</p>
                </div>
            </div>
        </div>
    );
    }

    else{
        return null;
    }
}

export default SummaryItem;