import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";
import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";

export default function RootLayout() {

  return (
    <div className="root-layout">
      <ScrollRestoration />
      <header>
        <nav>
          <h1>RocketCart</h1>
          
          <NavLink to="/">Home</NavLink>
          <NavLink to="login">Login</NavLink>
          <NavLink to="cart">Cart</NavLink>
          <NavLink to="help">Help</NavLink>
        </nav>
        <Breadcrumbs />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
