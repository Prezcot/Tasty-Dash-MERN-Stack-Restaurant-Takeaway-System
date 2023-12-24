import Dashboard from "./User/Dashboard";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function NavBar(props) {
  const nav = useNavigate();
  const [page, setPage] = useState("home");

  const switchPage = (newPage) => {
    setPage(newPage);
  };

  const handleLogout = () => {
    
    nav("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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
              <li className={`nav-item ${page === "home" ? "active" : ""}`}>
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={() => switchPage("home")}
                >
                  Home
                </a>
              </li>
              <li className={`nav-item ${page === "menu" ? "active" : ""}`}>
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={() => switchPage("menu")}
                  href="/menu"
                >
                  Menu
                </a>
              </li>
              <li className={`nav-item ${page === "orders" ? "active" : ""}`}>
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={() => switchPage("orders")}
                  href="/orders"
                >
                  Orders
                </a>
              </li>
            </ul>
            <img
              src="/images/usericon.png"
              onClick={() => nav("/dashboard")}
              width="60px"
              height="50px"
            />
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
