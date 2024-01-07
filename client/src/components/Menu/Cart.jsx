import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ items, quantity_map }) {
  const nav = useNavigate();

  const cart_items = items.filter((item) => quantity_map[item.itemName] > 0);
  const unique_items_count = cart_items.length;
  const [is_hovered, setIsHovered] = useState(false);

  const formattedCart = cart_items.map(
    (item) =>
      `${item.itemName},${item.itemPrice},${quantity_map[item.itemName]}`
  );
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(formattedCart));
  }, [formattedCart]);

  return (
    <>
      <div
        className="cart"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          className="cart-hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="cart-icon"
            style={{ position: "fixed" }}
            title="Hover to view and proceed to basket"
          >
            <img src="/images/Cart.png" alt="Shopping Cart" />
            <label className="unique-items-count">{unique_items_count}</label>
          </div>
          {is_hovered && (
            <div className="cart-contents">
              <div className="cart-items-list">
                {cart_items.map((item) => (
                  <label key={item.itemName}>
                    {item.itemName} (x{quantity_map[item.itemName]})
                  </label>
                ))}
              </div>
              <button onClick={() => nav("/basket")}>
                <b>View My Basket</b>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
