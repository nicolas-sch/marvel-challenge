import React from "react";
import { Link } from "react-router-dom";
import FavoritesIcon from "./FavoritesIcon";
import marvelLogo from "../assets/marvel-logo.png";
import "../styles/TopBar.scss";

const TopBar = () => {
  return (
    <div className="top-bar">
      <Link to="/">
        <img src={marvelLogo} alt="Marvel Logo" className="marvel-logo" />
      </Link>
      <FavoritesIcon />
    </div>
  );
};

export default TopBar;
