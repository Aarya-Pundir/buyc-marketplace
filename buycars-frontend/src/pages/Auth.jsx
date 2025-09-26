import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/main.css";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(true); // toggle form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("dealer");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        // Signup API
        const res = await axios.post("http://localhost:5000/users/signup", {
          name,
          email,
          password_hash: password,
          role
        });
        setMessage("Signup successful! You can now login.");
        setIsSignup(false); // switch to login
      } else {
        // Login API
        const res = await axios.post("http://localhost:5000/users/login", {
          email,
          password_hash: password
        });
        setMessage("Login successful!");
        console.log("Logged in user:", res.data);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to fetch");
    }
  };

  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="auth-form">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && (
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="dealer">Dealer</option>
              <option value="buyer">Buyer</option>
            </select>
          )}
          <button onClick={handleSubmit}>{isSignup ? "Signup" : "Login"}</button>
          <p>{message}</p>
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
              }}
            >
              {isSignup ? "Login" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
