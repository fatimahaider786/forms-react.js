import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/user/login", { userName, password });
      if (res.data.loginToken) {
        localStorage.setItem("loginToken", res.data.loginToken);
        window.location.href = "/"; 
      }
    } catch (err) {
      alert("Ghalat Username ya Password!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Login</button>
      </form>
      <p onClick={() => window.location.href="/signup"} style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}>Signup</p>
    </div>
  );
};
export default Login;