import Dashboard from "./User/Dashboard";
import { useState } from "react";
import {useNavigate } from 'react-router-dom';
function NavBar(props) {
  const nav = useNavigate();
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Restaurant_Name
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a style={{cursor:"pointer"}} class="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
              <li class="nav-item active">
                <a style={{cursor:"pointer"}} class="nav-link active" href="/menu">
                  Menu
                </a>
              </li>
              <li class="nav-item active">
                <a style={{cursor:"pointer"}} class="nav-link active" href="/orders">
                  Orders
                </a>
              </li>
            </ul>
            <img
              src="/images/usericon.png"
              onClick={()=>nav("/dashboard")}
              width="60px"
              height="50px"
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
