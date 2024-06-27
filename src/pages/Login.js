import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import axiosInstance from "./axiosInstance";
import '../css/Login.css';

const Login = ({ setShowPopup, setPopupMsg, role, setRole, logged, setLogged, id, setId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [isNewUser, setIsNewUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      navigate('/profile'); 
    }
  }, [logged, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
      try {
          const response = await axios.post('http://localhost:8080/api/login', { username, password });
          console.log(response)
          const jwt  = response.data.jwt;
          const fetched_id  = response.data.userDetails.id;
          localStorage.setItem('token', jwt); 
          localStorage.setItem('id', fetched_id); 
          setLogged(true);
          if (response.data.roles[0]===('ROLE_CUSTOMER')) 
          {
            localStorage.setItem('role', 1); 
            setRole(1);
          }
          else if (response.data.roles[0]===('ROLE_SELLER')) {
            localStorage.setItem('role', 2); 
            setRole(2);}
          else {
            localStorage.setItem('role', 3); 
            setRole(3);}
          setId(response.data.userDetails.id);
          setPopupMsg("Logged in!");
          navigate('/');
      } catch (error) {
        setLogged(false);
        setPopupMsg("Username or password incorrect. Try again!");
        console.error(error, logged, id);
      }
    
    setShowPopup(true);
  };

  const handleSignupUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup/user', { "username": username, "password": password, "email": email, "phoneNumber" : phone, "address": address, "billingAddress": billingAddress});
      setIsNewUser(false)
      console.log('Reply: ', response);
      setPopupMsg("Signed up!");
      setShowPopup(true);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setLogged(false);
    }
  };

  const handleSignupSeller = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup/seller', { "username": username, "password": password, "email": email, "phoneNumber" : phone});
      setIsNewUser(false)
      console.log('Reply: ', response);
      setPopupMsg("Signed up!");
      setShowPopup(true);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setLogged(false);
    }
  };

  return (
    <div className="login">
      {!isSeller && (<h2>{isNewUser ? "Sign Up" : "Log In"}</h2>)}
      {isSeller && (<h2>{isNewUser ? "Seller Sign Up" : "Seller Log In"}</h2>)}
      <form onSubmit={isNewUser ? ((!isSeller)? handleSignupUser : handleSignupSeller) : handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => { setUsername(e.target.value); }}
          required
        />
        {isNewUser && (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
              required
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {!isSeller && (<><label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => { setAddress(e.target.value); }}
              required
            />
            <label htmlFor="billing-address">Billing Address</label>
            <input
              type="text"
              id="billing-address"
              value={billingAddress}
              onChange={(e) => { setBillingAddress(e.target.value); }}
              required
            />
            </>
            )}
          </>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isNewUser ? "Sign Up" : "Log In"}</button>
      </form>
      {isNewUser ? "Already have an account?" : "Don't have an account?"}
      <button className="link-button" onClick={() => setIsNewUser(!isNewUser)}>
        {isNewUser ? "Log In" : "Sign Up"}
      </button>
      <br />
      {!isSeller ? (
        <button className="link-button" onClick={() => { setIsSeller(true); }} style={{ padding: "0px" }}>
          Login as Seller
        </button>
      ) : (
        <button className="link-button" onClick={() => { setIsSeller(false); }} style={{ padding: "0px" }}>
          Login as Customer
        </button>
      )}
    </div>
  );
}

export default Login;
