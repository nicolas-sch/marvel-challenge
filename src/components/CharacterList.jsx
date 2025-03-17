import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, resetSearch } from "../store/charactersSlice";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import CharacterCard from "./CharacterCard";
import "../styles/CharacterList.scss";

const CharacterList = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const favorites = useSelector((state) => state.favorites.favorites);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(resetSearch());
  }, [dispatch]);

  const handleFavoriteClick = (character) => {
    if (favorites.some((fav) => fav.id === character.id)) {
      dispatch(removeFavorite(character.id));
    } else {
      dispatch(addFavorite(character));
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="character-list">
      <TopBar />
      <SearchBar resultsCount={characters.length} />
      <div className="card_container">
        {characters.map((character) => (
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

export default CharacterList;
