import { Outlet, NavLink, ScrollRestoration, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import '../RootLayout.css';

export default function RootLayout({ role, setRole, logged, setLogged, id, setId }) {
  const navigate = useNavigate();
  return (
    <div className="root-layout">
      <ScrollRestoration />
      <header>
        <nav className="navbar">
          <h1>RocketCart</h1>
          <NavLink to="/" activeClassName="nav-link-active">Home</NavLink>
          <NavLink to="/login" activeClassName="nav-link-active">{(logged)? "Profile": "Login"}</NavLink>
          {(role!==2) ? (
              <NavLink to="/cart" activeClassName="nav-link-active">Cart</NavLink>
          ) : 
          <NavLink to="/add" activeClassName="nav-link-active">Add Product</NavLink>}
          {(role===1)? (
            <NavLink to="/history" activeClassName="nav-link-active">Order History</NavLink>
          ) : null
          }
          <NavLink to="/help" activeClassName="nav-link-active">Help</NavLink>
          {(logged)? (
            <button style={{border:'1px red', backgroundColor:'white', color:'red'}} onClick={()=>{setLogged(false); setId(0); navigate('/')}}>Log Out</button>
          ) : null
          }
        </nav>
        {/* <Breadcrumbs /> */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
