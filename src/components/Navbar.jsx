import React from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("loginToken");

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">My Store</Link>

      {token && (
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;