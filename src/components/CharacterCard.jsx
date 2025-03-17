import React from "react";
import { Link } from "react-router-dom";
import favoritesIcon from "../assets/favorites.png";
import favoritesEmptyIcon from "../assets/favorites-empty.png";
import "../styles/CharacterCard.scss";

const CharacterCard = ({ character, isFavorite, onFavoriteClick }) => {
  return (
    <div className="card_character">
      <div className="image_character">
        <Link to={`/character/${character.id}`}>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
        </Link>
      </div>
      <div className="name_character">
        <h2>{character.name}</h2>
        <button
          className="favorite_button"
          onClick={() => onFavoriteClick(character)}
        >
          <img
            src={isFavorite ? favoritesIcon : favoritesEmptyIcon}
            alt="Favorites icon"
            className="favorite_icon"
          />
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
