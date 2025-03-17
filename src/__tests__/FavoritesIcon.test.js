import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FavoritesIcon from "../components/FavoritesIcon";

const mockStore = configureStore([]);

jest.mock("../path/to/favorites.png", () => "favorites.png");

describe("FavoritesIcon Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      favorites: {
        favorites: [
          { id: 1, name: "Spider-Man" },
          { id: 2, name: "Iron Man" },
        ],
      },
    });
  });

  it("renders correctly with the number of favorites", () => {
    render(
      <Provider store={store}>
        <FavoritesIcon />
      </Provider>
    );

    const icon = screen.getByAltText("Favorites icon");
    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain("favorites.png");

    const count = screen.getByText("2");
    expect(count).toBeInTheDocument();
  });

  it("renders correctly with no favorites", () => {
    store = mockStore({
      favorites: {
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <FavoritesIcon />
      </Provider>
    );

    const icon = screen.getByAltText("Favorites icon");
    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain("favorites.png");

    const count = screen.getByText("0");
    expect(count).toBeInTheDocument();
  });
});