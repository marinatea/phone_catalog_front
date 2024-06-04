import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LOCAL_FAVORITES_KEY } from '../constants/localStorageKeys';
import { ProductT } from '../types';

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
    addToFavorites: (
      state,
      action: PayloadAction<{ product: ProductT; userId: string }>,
    ) => {
      state.favorites.push(action.payload.product);
      localStorage.setItem(
        LOCAL_FAVORITES_KEY + action.payload.userId,
        JSON.stringify(state.favorites),
      );
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<{ productId: string; userId: string }>,
    ) => {
      const index = state.favorites.findIndex(
        product => product.name === action.payload.productId,
      );

      if (index !== -1) {
        state.favorites.splice(index, 1);
        localStorage.setItem(
          LOCAL_FAVORITES_KEY + action.payload.userId,
          JSON.stringify(state.favorites),
        );
      }
    },
    setFavorites: (
      state,
      action: PayloadAction<{ products: ProductT[]; userId: string }>,
    ) => ({
      ...state,
      favorites: action.payload.products,
    }),
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
