import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "../components/CharacterCard";

jest.mock("../assets/favorites.png", () => "http://localhost/favorites.png");
jest.mock("../assets/favorites-empty.png", () => "http://localhost/favorites-empty.png");

jest.mock("react-router-dom", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

describe("CharacterCard Component", () => {
  const mockCharacter = {
    id: 1,
    name: "Spider-Man",
    thumbnail: {
      path: "http://example.com/spiderman",
      extension: "jpg",
    },
  };

  const mockOnFavoriteClick = jest.fn();

  it("renders correctly", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();

    const characterImage = screen.getByAltText("Spider-Man");
    expect(characterImage).toBeInTheDocument();
    expect(characterImage.src).toBe(
      "http://example.com/spiderman.jpg"
    );

    const favoriteIcon = screen.getByAltText("Favorites icon");
    expect(favoriteIcon).toBeInTheDocument();
  });


  it("calls onFavoriteClick when the favorite button is clicked", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(mockOnFavoriteClick).toHaveBeenCalledWith(mockCharacter);
  });
});