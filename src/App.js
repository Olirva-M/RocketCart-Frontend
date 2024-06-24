import React, { useState } from 'react';
import axios from 'axios';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Faq from './pages/help/Faq';
import Contact, { contactAction } from './pages/help/Contact';
import NotFound from './pages/NotFound';
import Careers, { careersLoader } from './pages/careers/Careers';
import CareerDetails, { careerDetailsLoader } from './pages/careers/CareerDetails';
import CareersError from './pages/careers/CareersError';

// layouts
import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout';
import CareersLayout from './layouts/CareersLayout';

// components
import './App.css';

const App = () => {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="help" element={<HelpLayout />}>
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} action={contactAction} />
        </Route>
        <Route path="careers" element={<CareersLayout />} errorElement={<CareersError />}>
          <Route 
            index 
            element={<Careers />} 
            loader={careersLoader}
          />
          <Route 
            path=":id" 
            element={<CareerDetails />}
            loader={careerDetailsLoader}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}>
      <div className="App">
        
        <Home />
        {/* <button onClick={handleButtonClick}>Add Product</button> */}
        {/* <div className="input-fields">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={handleCategoryChange}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div> */}
      </div>
    </RouterProvider>
  );
};

export default App;
