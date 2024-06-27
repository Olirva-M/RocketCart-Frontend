import { Outlet, NavLink, ScrollRestoration, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";
import '../css/RootLayout.css';
import Popup from "../pages/Popup";

export default function RootLayout({ setCartItemCount, cartItemCount, showPopup, setShowPopup, popupMsg, role, setRole, logged, setLogged, id, setId }) {
  const navigate = useNavigate();
  

  
  return (
    <div className="root-layout">
      <ScrollRestoration />
      <header>
        <nav className="navbar">
          <h1>RocketCart</h1>
          <NavLink to="/" activeClassName="nav-link-active">Home</NavLink>
          <NavLink to="/login" activeClassName="nav-link-active">{(logged)? "Profile": "Login"}</NavLink>
          {(role!=2) ? (
            <div className="cart-nav">
              <NavLink to="/cart" activeClassName="nav-link-active">Cart</NavLink>
              {role > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </div>
          ) : 
          <NavLink to="/add" activeClassName="nav-link-active">Add Product</NavLink>}
          {(logged && role==1)? (
            <NavLink to="/history" activeClassName="nav-link-active">Order History</NavLink>
          ) : null
          }
          {(logged)? (
            <button style={{border:'1px red', backgroundColor:'white', color:'red'}} onClick={()=>{setLogged(false); setRole(0); navigate('/'); localStorage.removeItem('token');localStorage.removeItem('id');localStorage.removeItem('role');}}>Log Out</button>
          ) : null
          }
        </nav>
        {/* <Breadcrumbs /> */}
      </header>
      <main>
        <Outlet />

      {showPopup && <Popup message={popupMsg} setShowPopup={setShowPopup}/>}
      </main>
    </div>
  );
}
