import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { fetchCharacters } from "../store/charactersSlice";

const mockStore = configureStore([]);

jest.mock("../store/charactersSlice", () => ({
  fetchCharacters: jest.fn(),
}));

describe("SearchBar Component", () => {
  it("renders correctly", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <SearchBar resultsCount={10} />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText("SEARCH A CHARACTER...")
    ).toBeInTheDocument();
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByText("Results: 10")).toBeInTheDocument();
  });

  it("dispatches fetchCharacters with the search term on form submission", () => {
    const store = mockStore({});
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SearchBar resultsCount={0} />
      </Provider>
    );

    const input = screen.getByPlaceholderText("SEARCH A CHARACTER...");
    fireEvent.change(input, { target: { value: "Spider-Man" } });

    fireEvent.submit(screen.getByTestId("form"));

    expect(store.dispatch).toHaveBeenCalledWith(
      fetchCharacters({ nameStartsWith: "Spider-Man" })
    );
  });

  it("dispatches fetchCharacters without search term if input is empty", () => {
    const store = mockStore({});
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SearchBar resultsCount={0} />
      </Provider>
    );

    fireEvent.submit(screen.getByTestId("form"));
    expect(store.dispatch).toHaveBeenCalledWith(fetchCharacters());
  });

  it("displays the correct results count", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <SearchBar resultsCount={5} />
      </Provider>
    );

    expect(screen.getByText("Results: 5")).toBeInTheDocument();
  });
});