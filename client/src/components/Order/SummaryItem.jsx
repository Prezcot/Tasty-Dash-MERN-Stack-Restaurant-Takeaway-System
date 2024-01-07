import React from "react";

function SummaryItem({ item_prop2, index_prop2, cart_prop2 }) {
  let [name2, price2, qty2] = item_prop2.split(",");
  let totalPrice = (parseFloat(price2) * parseInt(qty2)).toFixed(2);

  if (qty2 > 0) {
    return (
      <div className="details">
        <div id="indi-detail">
          <div>
            <p className="textcolor">
              {name2} (x {qty2})
            </p>
          </div>

          <div>
            <p className="textcolor">${totalPrice}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default SummaryItem;
