import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import '../css/Profile.css';
import OrderHistory from './OrderHistory';
import SellerStat from './SellerStat';

const Profile = ({ logged, role, setLogged, id, setId }) => {
  const [customer, setCustomer] = useState(null);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      if (role == 1) {
        axiosInstance.get(`http://localhost:8080/api/c/${id}`)
          .then(response => {
            setCustomer(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the customer data!', error);
          });
      }
      if (role == 2) {
        axiosInstance.get(`http://localhost:8080/api/s/${id}`)
          .then(response => {
            setCustomer(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the customer data!', error);
          });
      }
      if (role == 3) {
        axiosInstance.get(`http://localhost:8080/api/admin/${id}`)
          .then(response => {
            setCustomer(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the admin data!', error);
          });
      }
    } else {
      navigate('/login');
    }
  }, [logged, role, id, navigate]);

  useEffect(() => {
    if (showOrderHistory) {
      // Disable scrolling on body or html when order history is shown
      document.body.style.overflow = 'hidden';
      return () => {
        // Re-enable scrolling when component unmounts or showOrderHistory becomes false
        document.body.style.overflow = 'auto';
      };
    }
  }, [showOrderHistory]);

  if (!customer) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="profile-container" style={{ filter: showOrderHistory ? "blur(5px)" : "none" }}>
        <div className="profile-header">
          <div className="profile-picture">
            <img src={customer.profilePicture} alt="Profile" />
          </div>
          <div className="profile-details">
            <h2>{customer.username}</h2>
          </div>
        </div>
        <div className="profile-info">
          <ul>
            <li><strong>Username:</strong> {customer.username}</li>
            <li><strong>Email:</strong> {customer.email}</li>
            {(localStorage.getItem("role")!=3) && (<li><strong>Phone:</strong> {customer.phoneNumber}</li>)}
            {(role == 1) && (<li><strong>Billing Address:</strong> {customer.billingAddress}</li>)}
          </ul>
          {(localStorage.getItem("role")==1) && (<button style={{backgroundColor: "blue"}} onClick={() => setShowOrderHistory(!showOrderHistory)} style={{backgroundColor:"blue"}}>
            {showOrderHistory ? 'Hide Order History' : 'View Order History'}
          </button>)}
        </div>
      </div>
      {
      (localStorage.getItem("role")==1) && showOrderHistory && <OrderHistory logged={logged} id={localStorage.getItem("id")} onClose={() => {setShowOrderHistory(false)}} />}
      {
        (localStorage.getItem("role")==2) && <SellerStat />}
    </>
  );
};

export default Profile;
