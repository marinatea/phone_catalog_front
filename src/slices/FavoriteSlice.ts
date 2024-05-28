import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductT } from '../types';
import { LOCAL_FAVORITES_KEY } from '../constants/localStorageKeys';

export interface FavoritesState {
  favorites: ProductT[];
}

export const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<ProductT>) => {
      state.favorites.push(action.payload);
      localStorage.setItem(
        LOCAL_FAVORITES_KEY,
        JSON.stringify(state.favorites),
      );
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const index = state.favorites.findIndex(
        product => product.name === action.payload,
      );

      if (index !== -1) {
        state.favorites.splice(index, 1);
        localStorage.setItem(
          LOCAL_FAVORITES_KEY,
          JSON.stringify(state.favorites),
        );
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
