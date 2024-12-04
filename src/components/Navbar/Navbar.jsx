import React, { useContext, useState } from "react";
import "./Navbar.css";
import { GameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, login } = useContext(GameContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  const handleLogout = () => {
    login("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyLogo</div>
      <div className="navbar-buttons">
        {user ? (
          <div>
            <span>Welcome {user}</span>
            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="navbar-btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
