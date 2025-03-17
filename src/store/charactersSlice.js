import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";
import { getCachedData, setCachedData } from "../utils/cache";

const publicKey = "b81a4267871891036965e4f23678bb3e";
const privateKey = "f9d23e623c8c50347303121267767c99f1adb4c3";

const instance = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});

instance.interceptors.request.use((config) => {
  const timestamp = new Date().getTime();
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

  config.params = {
    ...config.params,
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  };

  return config;
});

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (params = {}) => {
    const cacheKey = `characters_${JSON.stringify(params)}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await instance.get("/characters", {
      params: {
        ...params,
        limit: 50,
      },
    });

    const data = response.data.data.results;
    setCachedData(cacheKey, data);
    return data;
  }
);

export const fetchCharacterDetails = createAsyncThunk(
  "characters/fetchCharacterDetails",
  async (characterId) => {
    const cacheKey = `character_${characterId}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await instance.get(`/characters/${characterId}`);
    const data = response.data.data.results[0];
    setCachedData(cacheKey, data);
    return data;
  }
);

export const fetchCharacterComics = createAsyncThunk(
  "characters/fetchCharacterComics",
  async (characterId) => {
    const cacheKey = `character_comics_${characterId}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await instance.get(`/characters/${characterId}/comics`);
    const data = response.data.data.results;
    setCachedData(cacheKey, data);
    return data;
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    characterDetails: null,
    characterComics: [],
    status: "idle",
    error: null,
    searchResultsCount: 0,
    
  },
  reducers: {
    setSearchResultsCount: (state, action) => {
      state.searchResultsCount = action.payload;
    },
    resetSearch: (state) => {
        state.searchResultsCount = 0;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = action.payload;
        state.searchResultsCount = action.payload.length;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characterDetails = action.payload;
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCharacterComics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacterComics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characterComics = action.payload;
      })
      .addCase(fetchCharacterComics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetCharacterDetails, setSearchResultsCount, resetSearch } = charactersSlice.actions;
export default charactersSlice.reducer;
