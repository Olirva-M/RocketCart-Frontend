import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Cart from './pages/Cart';
import CartError from './pages/CartError';
import Profile from './pages/Profile';
import Order from './pages/Order';
import AddProduct from './pages/AddProduct';
import Payment from './pages/Payment';
import Customers from './pages/Customers';
import VerifiedSellers from './pages/VerifiedSellers';
import AuthorizeSellers from './pages/AuthorizeSellers';


// layouts
import RootLayout from './layouts/RootLayout';
import OrderHistory from './pages/OrderHistory';

// components
import './css/App.css';
import axiosInstance from './pages/axiosInstance';

const App = () => {
  const [logged, setLogged] = useState(false);
  const [id, setId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('...');
  const [cartItemCount, setCartItemCount] = useState(0);

  // 0 - logged out
  // 1 - customer
  // 2 - seller
  // 3 - admin
  const [role, setRole] = useState(0);

  function retainLogin() {
    setLogged(true);
    setId(localStorage.getItem('id'));
    setRole(localStorage.getItem('role'));
    console.log("Retaining login details", localStorage.getItem('role'));
  }

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (localStorage.getItem("role") > 0) {
        try {
          const response = await axiosInstance.get(`http://localhost:8080/api/customers/${localStorage.getItem("id")}/cart`);
          setCartItemCount(response.data.length);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartItemCount();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      retainLogin();
    }
    console.log("App is rendered", id, role, logged, localStorage.getItem('token'));
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout
        cartItemCount={cartItemCount}
        setCartItemCount={setCartItemCount}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        popupMsg={popupMsg}
        setPopupMsg={setPopupMsg}
        role={localStorage.getItem('role')}
        setRole={setRole}
        logged={logged}
        setLogged={setLogged}
        id={localStorage.getItem('id')}
        setId={setId} />}
      >
        <Route index element={<Home
          cartItemCount={cartItemCount}
          setCartItemCount={setCartItemCount}
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path='customer' element={<Customers
          cartItemCount={cartItemCount}
          setCartItemCount={setCartItemCount}
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path='verified-sellers' element={<VerifiedSellers
          cartItemCount={cartItemCount}
          setCartItemCount={setCartItemCount}
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path='new-sellers' element={<AuthorizeSellers
          cartItemCount={cartItemCount}
          setCartItemCount={setCartItemCount}
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path="login" element={<Login
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path="product/:pid" element={<Product
          setCartItemCount={setCartItemCount}
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path="profile" element={<Profile
          role={role}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path="history" element={<OrderHistory
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path="add" element={<AddProduct
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path="payment" element={<Payment
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={localStorage.getItem('role')}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path="order/:oid" element={<Order
          role={role}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={localStorage.getItem('id')}
          setId={setId} />}
        />
        <Route path="cart" element={<Cart
          cartItemCount={cartItemCount}
          setCartItemCount={setCartItemCount}
          setShowPopup={setShowPopup}
          setPopupMsg={setPopupMsg}
          role={role}
          setRole={setRole}
          logged={logged}
          setLogged={setLogged}
          id={id}
          setId={setId} />}
          errorElement={<CartError />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}>
      <div className="App">
        <Home/>
      </div>
    </RouterProvider>
  );
};

export default App;
