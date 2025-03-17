import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CharacterList from "../components/CharacterList";

jest.mock("../components/TopBar", () => () => <div>TopBar</div>);
jest.mock("../components/SearchBar", () => () => <div>SearchBar</div>);
jest.mock("../components/CharacterCard", () => ({ character }) => (
  <div>{character.name}</div>
));

const mockStore = configureStore([]);

describe("CharacterList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      characters: {
        characters: [
          {
            id: 1,
            name: "Spider-Man",
            thumbnail: {
              path: "http://example.com/spiderman",
              extension: "jpg",
            },
          },
          {
            id: 2,
            name: "Iron Man",
            thumbnail: {
              path: "http://example.com/ironman",
              extension: "jpg",
            },
          },
        ],
        status: "succeeded",
        error: null,
      },
      favorites: {
        favorites: [],
      },
    });
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <CharacterList />
      </Provider>
    );

    expect(screen.getByText("TopBar")).toBeInTheDocument();
    expect(screen.getByText("SearchBar")).toBeInTheDocument();

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
  });

  it("displays loading state", () => {
    store = mockStore({
      characters: {
        characters: [],
        status: "loading",
        error: null,
      },
      favorites: {
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <CharacterList />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error state", () => {
    store = mockStore({
      characters: {
        characters: [],
        status: "failed",
        error: "Failed to fetch characters",
      },
      favorites: {
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <CharacterList />
      </Provider>
    );

    expect(
      screen.getByText("Error: Failed to fetch characters")
    ).toBeInTheDocument();
  });
});
