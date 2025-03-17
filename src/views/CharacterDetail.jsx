import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacterDetails,
  fetchCharacterComics,
} from "../store/charactersSlice";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import "../styles/CharacterDetail.scss";
import TopBar from "../components/TopBar";
import ComicsSlider from "../components/ComicsSlider";
import favoritesIcon from "../assets/favorites.png";
import favoritesEmptyIcon from "../assets/favorites-empty.png";

const CharacterDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const character = useSelector((state) => state.characters.characterDetails);
  const comics = useSelector((state) => state.characters.characterComics);
  const status = useSelector((state) => state.characters.status);
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    dispatch(fetchCharacterDetails(id));
    dispatch(fetchCharacterComics(id));
  }, [dispatch, id]);

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
    return <div>Error fetching character details.</div>;
  }

  if (!character) {
    return <div>No character data available.</div>;
  }

  return (
    <>
      <TopBar />
      <div className="character_detail_container">
        <div className="character_resume">
          <div className="character_detail_image">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </div>

          <div className="character_detail_name">
            <div className="character_detail_title">
              <h1>{character.name}</h1>
              <button
                className="favorite_button"
                onClick={() => handleFavoriteClick(character)}
              >
                <img
                  src={
                    favorites.some((fav) => fav.id === character.id)
                      ? favoritesIcon
                      : favoritesEmptyIcon
                  }
                  alt="Favorites icon"
                  className="favorite_icon"
                />
              </button>
            </div>

            <p>{character.description || "No description available."}</p>
          </div>
        </div>

        <div className="character_comics">
          <h2>Comics</h2>
          <ComicsSlider comics={comics.slice(0, 20)} />
        </div>
      </div>
    </>
  );
};

export default CharacterDetail;
