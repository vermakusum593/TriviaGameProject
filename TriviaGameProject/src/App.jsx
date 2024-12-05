import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider} from "./context/GameContext";
import Login from "./pages/Login/Login";
import Game from "./pages/Game/Game";
import GameStart from "./pages/Game/GameStart";
import GameResults from "./pages/Game/GameResults";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game" element={<Game />}>
            <Route path="start" element={<GameStart />} />
            <Route path="results" element={<GameResults />} />
          </Route>
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;