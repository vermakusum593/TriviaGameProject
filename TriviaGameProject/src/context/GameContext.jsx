import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);

  const login = (username) => {
    console.log(username);
    setUser(username);

  }
    
  const logout = () => {
    setUser(null);
    setScore(0);
  };
  const increaseScore = () => setScore((prev) => prev + 1);

  return (
    <GameContext.Provider value={{ user, login, logout, score, increaseScore }}>
      {children}
    </GameContext.Provider>
  );
};

