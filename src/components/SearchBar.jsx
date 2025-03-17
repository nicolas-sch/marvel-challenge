import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCharacters } from "../store/charactersSlice";
import "../styles/SearchBar.scss";

const SearchBar = ({ resultsCount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchCharacters({ nameStartsWith: searchTerm }));
    } else {
      dispatch(fetchCharacters());
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-bar" data-testid="form">
        <button type="submit" className="search-icon">
          🔍
        </button>
        <input
          type="text"
          placeholder="SEARCH A CHARACTER..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="results-count">Results: {resultsCount}</div>{" "}
    </div>
  );
};

export default SearchBar;
