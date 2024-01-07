import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminMenu from "./AdminMenu";
import AdminOrderRefund from "./AdminOrderRefund";
import AdminCollectedOrder from "./AdminCollectedOrder";

import "../../BootstrapImports.js";

const AdminNavBar = () => {
  const [page, setPage] = useState("admin_dashboard");
  console.log(page);
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
                    page === "admin_dashboard" ? "active" : "opacity-50"
                  }`}
                  aria-current="page"
                  onClick={() => setPage("admin_dashboard")}
                  style={{ cursor: "pointer" }}
                >
                  Pending Orders
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    page === "admin_order_refund" ? "active" : "opacity-50"
                  }`}
                  onClick={() => setPage("admin_order_refund")}
                  style={{ cursor: "pointer" }}
                >
                  Refunds
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    page === "admin_collected_order" ? "active" : "opacity-50"
                  }`}
                  onClick={() => setPage("admin_collected_order")}
                  style={{ cursor: "pointer" }}
                >
                  Collected Orders
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    page === "admin_add_menu_items" ? "active" : "opacity-50"
                  }`}
                  onClick={() => setPage("admin_add_menu_items")}
                  style={{ cursor: "pointer" }}
                >
                  Add New Menu Item
                </a>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/signin"
                  onClick={()=>{sessionStorage.removeItem("token")
                sessionStorage.removeItem("username")}}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {page === "admin_dashboard" && <AdminDashboard />}
      {page === "admin_add_menu_items" && <AdminMenu />}
      {page === "admin_order_refund" && <AdminOrderRefund />}
      {page === "admin_collected_order" && <AdminCollectedOrder />}
    </>
  );
};

export default AdminNavBar;
