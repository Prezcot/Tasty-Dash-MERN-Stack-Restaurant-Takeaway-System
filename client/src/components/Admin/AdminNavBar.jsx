import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminMenu from "./AdminMenu";
const AdminNavBar = () => {
  const [page, set_page] = useState("admin_dashboard");

  const switch_page = (page) => {
    console.log("page was switched");
    if (page === "admin_dashboard") set_page("admin_dashboard");
    else if (page === "admin_add_menu_items") set_page("admin_add_menu_items");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                >
                  Add New Menu Item
                </a>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li> */}
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
