import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // If login is successful
    navigate("/dashboard"); 
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // If login is successful
    setIsNewUser(false); 
  };

  return (
    <div className="login">
      <h2>{isNewUser ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={isNewUser ? handleSignup : handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
      <p>
        {isNewUser
          ? "Already have an account?"
          : "Don't have an account?"}
        <button className="link-button" onClick={() => setIsNewUser(!isNewUser)} >
          {isNewUser ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
