import React, { useState, useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
;
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const { login } = useContext(GameContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      const userPassword = localStorage.getItem(username.trim());
      if (password.trim()=== userPassword) {
        login(username);
        navigate("/game/start");
      } else {
        setError("Wrong password. Please try again.");
      }
    } else {
      setError("Please enter both username and password.");
    }
  };

  const verifyPassword = (inputPassword) => {
    if (password !== inputPassword) {
      setPassword("");
      alert("Password entered didnt match");
    }
  };

  const createUser = () => {
    setLoading(true);
    localStorage.setItem(username, password);
    setTimeout(() => setLoading(false), 2000);
  };

  const openRegisterForm = () => {
    setMode("register");
  };

  const openLoginForm = () => {
    setMode("login");
  };

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
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Re-enter your password"
            required
            onBlur={(e) => verifyPassword(e.target.value)}
          />
          <div className="btn-container">
            <button onClick={createUser} disabled={loading}>
              Register
            </button>
            <button onClick={openLoginForm}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
