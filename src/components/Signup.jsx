import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/user/register", { userName, email, password });
      alert("Account Ban Gaya! Ab Login Karein.");
      navigate("/login"); 
    } catch (err) {
      alert("Signup fail: " + (err.response?.data?.message || "Error"));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required /><br/><br/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;