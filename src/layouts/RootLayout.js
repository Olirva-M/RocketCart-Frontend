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
          { (role!=3) && (<NavLink to="/" activeClassName="nav-link-active">Home</NavLink>)}
          { (role==3) && (<NavLink to="/customer" activeClassName="nav-link-active">Customers</NavLink>)}
          {/* { (role==3) && (<NavLink to="/verified-sellers" activeClassName="nav-link-active">Sellers</NavLink>)}
          { (role==3) && (<NavLink to="/new-sellers" activeClassName="nav-link-active">Authorize Sellers</NavLink>)} */}


          <NavLink to="/login" activeClassName="nav-link-active">{(logged)? "Profile": "Login"}</NavLink>
          {(logged)? (
            <button style={{border:'1px red', backgroundColor:'white', color:'red'}} onClick={()=>{setLogged(false); setRole(0); navigate('/'); localStorage.removeItem('token');localStorage.removeItem('id');localStorage.removeItem('role');}}>Log Out</button>
          ) : null
          }
          {(role<=1) ? (
            <div style={{ position: 'absolute', top: '10px', right: '100px',  zIndex: '9999' }}>
              <NavLink to="/cart" >
                <img src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png" style={{width:"40px", height:"40px"}}></img>
              </NavLink>
              {role > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </div>
          ) : null}
          {(role==2) ? <NavLink to="/add" activeClassName="nav-link-active">Add Product</NavLink>:null}
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
