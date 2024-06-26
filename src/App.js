import React, { useState } from 'react';
import axios from 'axios';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Faq from './pages/help/Faq';
import Contact, { contactAction } from './pages/help/Contact';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
// import Careers, { careersLoader } from './pages/careers/Careers';
// import CareerDetails, { careerDetailsLoader } from './pages/careers/CareerDetails';
import Cart from './pages/cart/Cart';
import CartError from './pages/cart/CartError';
import Profile from './pages/Profile';
import Order from './pages/Order';
import AddProduct from './pages/AddProduct';

// layouts
import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout';
// import CareersLayout from './layouts/CareersLayout';

// components
import './App.css';
import OrderHistory from './pages/OrderHistory';

const App = () => {

  const [logged, setLogged] = useState(0); 
  const [id, setId] = useState(0);

  // 0 - logged out
  // 1 - customer
  // 2 - seller
  // 3 - admin
  const [role, setRole] = useState(0);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>}>
        <Route index element={<Home role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>} />
        <Route path="login" element={<Login role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>} />
        <Route path="product/:pid" element={<Product role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>} />
        <Route path="profile" element={<Profile role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>} />
        <Route path="history" element={<OrderHistory role={role} setRole={setRole}  logged={logged} setLogged={setLogged} id={id} setId={setId}/>} />
        <Route path="add" element={<AddProduct role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>} />
        <Route path="order/:oid" element={<Order role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>} />
        <Route path="help" element={<HelpLayout />}>
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} action={contactAction} />
        </Route>
        <Route path="cart" element={<Cart role={role} setRole={setRole} logged={logged} setLogged={setLogged} id={id} setId={setId}/>} errorElement={<CartError />}>
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
