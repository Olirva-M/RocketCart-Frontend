import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

export default function Login({ role, setRole, logged, setLogged, id, setId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isNewUser, setIsNewUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (logged ) {
      navigate('/profile'); 
    }
  }, [logged, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      var response;
      if (isSeller){
        response = await axios.post('http://localhost:8080/api/sellerlogin', { "companyName":username, "password":password });
        console.log('Reply: ', response.data.customerId);
        setId(2);
        setRole(2);

      }
      else {
        response = await axios.post('http://localhost:8080/api/login', { username, password });
        setId(response.data.customerId);
        setRole(1);
      }
      setLogged(true);
        
      navigate('/');
    } catch (error) {
      // console.error('Login error:', error);
      setMsg("Login Failed. Try Again!");
      setLogged(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', { username, password });
      setLogged(true);
      setId(response.data.customerId);
      console.log('Reply: ', response.data.customerId);
      navigate('/profile');
    } catch (error) {
      console.error('Signup error:', error);
      setLogged(false);
    }
  };

  return (
    <div className="login">
      {!isSeller && (<h2>{(isNewUser) ? "Sign Up" : "Log In"}</h2>)}
      {isSeller && (<h2>{(isNewUser) ? "Seller Sign Up" : "Seller Log In"}</h2>)}

      {/* {(<h2>{(isNewUser) ? "Seller Sign Up" : "Seller Log In"}</h2>) && isSeller} */}
      {/* <h2>{(isSeller) ? "Seller Sign Up" : "Seller Log In"}</h2> */}
      <form onSubmit={isNewUser ? handleSignup : handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {setMsg("");setUsername(e.target.value)}}
          required
        />
        {isNewUser && (
          <>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {setMsg("");setEmail(e.target.value)}}
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
        </>)}
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
        {isNewUser
          ? "Already have an account?"
          : "Don't have an account?"}
        <button className="link-button" onClick={() => setIsNewUser(!isNewUser)} >
          {isNewUser ? "Log In" : "Sign Up"}
        </button>
        <br></br>
        {!isSeller ? 
        (<button className="link-button" onClick={() => {setIsSeller(true)}} style={{padding:"0px"}}>
            Login as Seller
        </button>) : 
        (<button className="link-button" onClick={() => {setIsSeller(false)}} style={{padding:"0px"}}>
            Login as Customer
        </button>)
        }
    <p style={{color:"red"}}>{msg}</p>
    </div>
  );
}
