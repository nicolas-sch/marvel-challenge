import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import favoritesIcon from "../assets/favorites.png";
import "../styles/FavoritesIcon.scss";

const FavoritesIcon = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <Link to="/favorites" className="favorites-icon">
      <span role="img" aria-label="Favorites">
        <img
          src={favoritesIcon}
          alt="Favorites icon"
          className="favorites_icon"
        />
      </span>
      <span className="favorites-count">{favorites.length}</span>
    </Link>
  );
};

export default FavoritesIcon;
