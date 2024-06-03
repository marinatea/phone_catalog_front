/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct } from '../types';
import { LOCAL_CART_KEY } from '../constants/localStorageKeys';

export interface CartState {
  cart: {
    [productId: string]: ICartProduct & { count: number };
  };
  itemCount: number;
  totalPrice: number;
}

const initialState: CartState = {
  cart: {},
  itemCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (
      state,
      action: PayloadAction<{
        [productId: string]: ICartProduct & { count: number };
      }>,
    ) => {
      state.cart = action.payload;

      state.totalPrice = Object.keys(state.cart).reduce(
        (count, cartItemId) =>
          count + state.cart[cartItemId].count * state.cart[cartItemId].price,
        0,
      );

      state.itemCount = Object.keys(state.cart).reduce(
        (count, cartItemId) => count + state.cart[cartItemId].count,
        0,
      );
    },
    addCartItem: (state, action: PayloadAction<ICartProduct>) => {
      state.itemCount++;
      state.totalPrice += action.payload.price;

      if (Object.hasOwn(state.cart, action.payload.id)) {
        state.cart[action.payload.id].count++;
      } else {
        state.cart[action.payload.id] = { ...action.payload, count: 1 };
      }

      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart));
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.itemCount--;
      state.totalPrice -= state.cart[action.payload].price;

      if (Object.hasOwn(state.cart, action.payload)) {
        if (state.cart[action.payload].count > 1) {
          state.cart[action.payload].count--;
        } else {
          delete state.cart[action.payload];
        }
      }

      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart));
    },
    removeCartItemsType: (state, action: PayloadAction<string>) => {
      const thisItemCount = state.cart[action.payload].count;

      state.itemCount -= thisItemCount;
      state.totalPrice -= state.cart[action.payload].price * thisItemCount;
      delete state.cart[action.payload];
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart));
    },
  },
});

export const {
  setCartItems,
  addCartItem,
  removeCartItem,
  removeCartItemsType,
} = cartSlice.actions;
export default cartSlice.reducer;
