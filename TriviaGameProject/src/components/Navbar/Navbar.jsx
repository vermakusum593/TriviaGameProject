import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Login</Link></li>
        {/* <li><Link to="/game/start">Start Game</Link></li> */}
        {/* <li><Link to="/game/results">Game Results</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
