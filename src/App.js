import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
// import Faq from './pages/help/Faq';
// import Contact, { contactAction } from './pages/help/Contact';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Cart from './pages/Cart';
import CartError from './pages/CartError';
import Profile from './pages/Profile';
import Order from './pages/Order';
import AddProduct from './pages/AddProduct';

// layouts
import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout';

// components
import './css/App.css';
import OrderHistory from './pages/OrderHistory';
import axiosInstance from './pages/axiosInstance';

const App = () => {

  const [logged, setLogged] = useState(0); 
  const [id, setId] = useState(0);
  const [showPopup, setShowPopup] = useState(false); 
  const [popupMsg, setPopupMsg] = useState('...');
  const [cartItemCount, setCartItemCount] = useState(0);


  useEffect( ()=>{
    if (showPopup) setShowPopup(true);
      
  }, [popupMsg]);

  // 0 - logged out
  // 1 - customer
  // 2 - seller
  // 3 - admin
  const [role, setRole] = useState(0);
  function retainLogin(){
    setLogged(true);
      setId(localStorage.getItem('id'));
      setRole(localStorage.getItem('role'));
      console.log("retaining login details", localStorage.getItem('role'))
  }

  useEffect(() => {
    const fetchCartItemCount = async () => {
      // console.log("fetching cart items no: role is ", localStorage.getItem("role"), localStorage.getItem("id") );
      if (localStorage.getItem("role") > 0) {
        try {
          const response = await axiosInstance.get(`http://localhost:8080/api/customers/${localStorage.getItem("id")}/cart`);
          console.log(response);
          setCartItemCount(response.data.length);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartItemCount();
  }, []);

  useEffect(()=>  {

    if(localStorage.getItem('token') != null){
      retainLogin();
    }
    console.log("App is rendered", id, role, logged, localStorage.getItem('token'));
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout cartItemCount={cartItemCount} setCartItemCount={setCartItemCount} showPopup={showPopup} setShowPopup={setShowPopup} popupMsg={popupMsg} setPopupMsg={setPopupMsg} role={localStorage.getItem('role')} setRole={setRole} logged={logged} setLogged={setLogged} id={localStorage.getItem('id')} setId={setId}/>}>
        <Route index element={<Home cartItemCount={cartItemCount} setCartItemCount={setCartItemCount} setShowPopup={setShowPopup} setPopupMsg={setPopupMsg} role={localStorage.getItem('role')} setRole={setRole} logged={logged} setLogged={setLogged} id={localStorage.getItem('id')} setId={setId}/>} />
        <Route path="login" element={<Login setShowPopup={setShowPopup} setPopupMsg={setPopupMsg} role={localStorage.getItem('role')} setRole={setRole} logged={logged} setLogged={setLogged} id={localStorage.getItem('id')} setId={setId}/>} />
        <Route path="product/:pid" element={<Product setCartItemCount={setCartItemCount} cartItemCount={cartItemCount} setCartItemCount={setCartItemCount} setShowPopup={setShowPopup} setPopupMsg={setPopupMsg} role={localStorage.getItem('role')} setRole={setRole} logged={logged} setLogged={setLogged} id={localStorage.getItem('id')} setId={setId}/>} />
        <Route path="profile" element={<Profile role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={localStorage.getItem('id')} setId={setId}/>} />
        <Route path="history" element={<OrderHistory setShowPopup={setShowPopup} setPopupMsg={setPopupMsg} role={localStorage.getItem('role')} setRole={setRole}  logged={logged} setLogged={setLogged} id={localStorage.getItem('id')} setId={setId}/>} />
        <Route path="add" element={<AddProduct setShowPopup={setShowPopup} setPopupMsg={setPopupMsg} role={localStorage.getItem('role')} setRole={setRole} logged={logged} setLogged={setLogged} id={localStorage.getItem('id')} setId={setId}/>} />
        <Route path="order/:oid" element={<Order role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={localStorage.getItem('id')} setId={setId}/>} />
        {/* <Route path="help" element={<HelpLayout />}>
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} action={contactAction} />
        </Route> */}
        <Route path="cart" element={<Cart cartItemCount={cartItemCount} setCartItemCount={setCartItemCount} setShowPopup={setShowPopup} setPopupMsg={setPopupMsg} role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>} errorElement={<CartError />}>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}>
      <div className="App">
        
        <Home />
      </div>
    </RouterProvider>
  );
};

export default App;
