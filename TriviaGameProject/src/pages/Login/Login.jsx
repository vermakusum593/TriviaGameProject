import React, { useState, useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(GameContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      const userPassword = localStorage.getItem(username.trim());
      if (userPassword) {
        setError("User doesn't exist, please register");
      }
      if (password.trim() === userPassword) {
        login(username);
        navigate("/game/start");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } else {
      setError("Please enter both username and password.");
    }
  };

  const verifyPassword = () => {
    if (password !== repeatPassword) {
      setPassword("");
      setRepeatPassword("");
      setError("Passwords didn't match");
    }
  };

  const createUser = () => {
    localStorage.setItem(username, password);
    setSuccessMsg(`${username} created successfully`);
  };

  const openRegisterForm = () => {
    setMode("register");
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    setError("");
    setSuccessMsg("");
  };

  const enableRegisterBtn =
    username && password && repeatPassword && password === repeatPassword;

  return (
    <div className="login-container">
      <h1>Trivia Game</h1>
      {mode === "login" && (
        <div className="login-form">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="btn-container">
            <button onClick={handleLogin}>Login</button>
            <button onClick={openRegisterForm}>Register</button>
          </div>
        </div>
      )}
      {mode === "register" && (
        <div className="register-form">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
          <input
            type="password"
            placeholder="Re-enter your password"
            value={repeatPassword}
            required
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              setError("");
            }}
            onBlur={(e) => verifyPassword()}
          />
          {error && <span style={{ color: "red" }}>{error}</span>}
          {successMsg && (
            <span style={{ color: "green" }}>
              {successMsg}&nbsp;&nbsp;&nbsp;
              <a href="/">Click here</a> to login
            </span>
          )}
          <div className="btn-container">
            <button onClick={createUser} disabled={!enableRegisterBtn}>
              Register
            </button>
            <button onClick={resetForm}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
