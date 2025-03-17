import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import CharacterCard from "../components/CharacterCard";
import "../styles/FavoritesView.scss";

const FavoritesView = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm("");
  }, []);

  const filteredFavorites = favorites.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteClick = (character) => {
    if (favorites.some((fav) => fav.id === character.id)) {
      dispatch(removeFavorite(character.id));
    } else {
      dispatch(addFavorite(character));
    }
  };

  return (
    <div className="favorites-view">
      <TopBar />
      <h1>Favorites</h1>
      <SearchBar
        resultsCount={filteredFavorites.length}
        onSearch={(term) => setSearchTerm(term)}
      />
      <div className="card_container">
        {filteredFavorites.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavorite={favorites.some((fav) => fav.id === character.id)}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesView;
