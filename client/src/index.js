import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
if (process.env.NODE_ENV !== 'test') { //we are able to use require here because we are essentially using react transform
  //commonjs which converts ES6 into CommonJS...which should be used rarely but is necessary in this case.
  require("bootstrap/dist/css/bootstrap.min.css");
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}
import "socket.io-client";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
