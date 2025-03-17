import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    favorites: favoritesReducer,
  },
});