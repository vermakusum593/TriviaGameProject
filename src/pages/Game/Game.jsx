import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { Outlet } from "react-router-dom";

const Game = () => {
  const { user } = useContext(GameContext);
    console.log(user);
  return (
    <div>
      <h1>Welcome to the Game, {user ? user : "Guest"}</h1>

      <Outlet />
    </div>
  );
};

export default Game;
