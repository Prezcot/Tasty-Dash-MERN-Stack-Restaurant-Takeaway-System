import React, { useState } from "react";
import "./App.css";
import PayPal from "./components/PayPal";

function App() {
  const [checkout, setCheckOut] = useState(false);

    // Chamaths side

  // let orderId = 8;
  // sessionStorage.setItem("order_id",JSON.stringify(orderId));

  // let username = 8;
  // sessionStorage.setItem("username",JSON.stringify(username));

  // let thinalcart = ["Pizza,600,1","Pebbles,400,3","Lava Cake,200,2"];
  // sessionStorage.setItem("cart",JSON.stringify(thinalcart));


  // let total_amount = 10;
  // sessionStorage.setItem("total_amount",JSON.stringify(total_amount));


let OrderId = sessionStorage.getItem('order_id');
let Username = sessionStorage.getItem('username');
let Cart = sessionStorage.getItem('cart');
let Total_amount = sessionStorage.getItem('total_amount');


  return (
  <>
  <h1>Checkout</h1><br/>

  <h2>Order Id:</h2>
  <label>{OrderId}</label>

  <h2>Username:</h2>
  <label>{Username}</label>

  <h2>Items:</h2>
  <label>{Cart}</label>

  <h2>Total Amount:</h2>
  <label>{Total_amount}</label>

  
  <div className="pay-button">
  {checkout ? (
    <PayPal />
  ) : (
    <button   
      style={{ backgroundColor: 'green', color: 'white' }}
      onClick={() => {
        setCheckOut(true);
      }}
    >
      Payment
    </button>

  )  }
</div>







    




  </>
  );
}

export default App;