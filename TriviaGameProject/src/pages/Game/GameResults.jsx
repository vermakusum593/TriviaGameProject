import React,{useContext} from "react";
import { GameContext } from "../../context/GameContext";


const GameResults = () => {
  const{score}= useContext(GameContext);
  return (
    <div>
      <h2>Game Over</h2>
      <p>your score:{score}</p>
    </div>
  );
};

export default GameResults;
