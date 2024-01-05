import Dashboard from "./User/Dashboard";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function NavBar(props) {
  const nav = useNavigate();
  const [page, setPage] = useState("home");

  const switch_page = (new_page) => {
    setPage(new_page);
  };
  const handleLogout = () => {
    sessionStorage.setItem("menu_cart","{}");
    sessionStorage.removeItem("order_id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    nav("/signin");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark top fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand">
            Tasty Dash
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${page === "menu" ? "active" : ""}`}>
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={() => switch_page("menu")}
                  href="/menu"
                >
                  Menu
                </a>
              </li>
              <li className={`nav-item ${page === "orders" ? "active" : ""}`}>
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={() => switch_page("orders")}
                  href="/orders"
                >
                  Orders
                </a>
              </li>
              <li className={`nav-item ${page === "orders" ? "active" : ""}`}>
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
