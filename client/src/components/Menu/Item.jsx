import React, { useEffect, useState } from "react";

function Item({ item, quantity, onAddToCart, onRemoveFromCart }) {
  const [local_Quantity, setLocalQuantity] = useState();

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  const handleAddToCart = () => {
    setLocalQuantity((prevQuantity) => prevQuantity + 1);
    onAddToCart();
  };

  const handleRemoveFromCart = () => {
    if (local_Quantity > 0) {
      setLocalQuantity((prevQuantity) => prevQuantity - 1);
      onRemoveFromCart();
    }
  };

  return (
    <div className="menu-card">
      <div style={{ width: "100%", height: "100%", marginBottom: "5%" }}>
        <img
          src={item.itemImage}
          alt={item.itemName}
          style={{
            borderRadius: "2%",
            width: "inherit",
            height: "inherit",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="menu-info">
        <h4 align="center">{item.itemName}</h4>
      </div>
      <div>
        <p>{item.itemDescription}</p>
      </div>
      <div>
        <p align="center" style={{ fontSize: "130%", fontWeight: "bold" }}>
          $ {item.itemPrice.toFixed(2)}
        </p>
      </div>
      {item.itemAvailability === "in-stock" ? (
        <div className="menu-actions">
          <img
            src="/images/Menu-Minus.png"
            className="remove-from-cart"
            onClick={handleRemoveFromCart}
            data-testid="minus"
            style={{ height: "40px", width: "70px" }}
          />
          <label className="quantity-in-cart" data-testid="my-quantity">
            {local_Quantity}
          </label>
          <img
            src="/images/Menu-Add.png"
            className="add-to-cart"
            onClick={handleAddToCart}
            data-testid="add"
            style={{ height: "40px", width: "70px" }}
          />
        </div>
      ) : (
        <div
          style={{
            color: "#df2120",
            textAlign: "center",
            marginTop: "10px",
            fontSize: "20px",
          }}
        >
          <b>Item is out of stock!</b>
        </div>
      )}
    </div>
  );
}

export default Item;
