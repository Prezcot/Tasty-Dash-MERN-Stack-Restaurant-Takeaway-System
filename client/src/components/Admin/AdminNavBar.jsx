import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminMenu from "./AdminMenu";
if (process.env.NODE_ENV !== 'test') {
  require("bootstrap/dist/css/bootstrap.min.css");
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}
// import "bootstrap/dist/js/bootstrap.bundle.min.js.map";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "jquery/dist/jquery.min.js";
// import "jquery/dist/jquery.min.map";

const AdminNavBar = () => {
  const [page, set_page] = useState("admin_dashboard");

  const switch_page = (page) => {
    console.log("page was switched");
    if (page === "admin_dashboard") set_page("admin_dashboard");
    else if (page === "admin_add_menu_items") set_page("admin_add_menu_items");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark top fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand">Admin Dashboard</a>
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
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    page === "admin_dashboard" ? "active" : ""
                  }`}
                  aria-current="page"
                  onClick={() => switch_page("admin_dashboard")}
                  style={{ cursor: "pointer" }}
                >
                  Pending Orders
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    page === "admin_add_menu_items" ? "active" : ""
                  }`}
                  onClick={() => switch_page("admin_add_menu_items")}
                  style={{ cursor: "pointer" }}
                >
                  Add New Menu Item
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signin">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {page === "admin_dashboard" && <AdminDashboard />}
      {page === "admin_add_menu_items" && <AdminMenu />}
    </>
  );
};

export default AdminNavBar;
