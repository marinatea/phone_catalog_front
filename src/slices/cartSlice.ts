/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct } from '../types';
import { LOCAL_CART_KEY } from '../constants/localCartKey';

export interface CartState {
  cart: {
    [productId: string]: ICartProduct & { count: number };
  };
  itemCount: number;
}

const initialState: CartState = {
  cart: {},
  itemCount: 0,
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

      state.itemCount = Object.keys(state.cart).reduce(
        (count, cartItemId) => count + state.cart[cartItemId].count,
        0,
      );
    },
    addCartItem: (state, action: PayloadAction<ICartProduct>) => {
      if (Object.hasOwn(state.cart, action.payload.id)) {
        state.cart[action.payload.id].count++;
      } else {
        state.cart[action.payload.id] = { ...action.payload, count: 1 };
      }

      state.itemCount++;
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart));
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      if (Object.hasOwn(state.cart, action.payload)) {
        if (state.cart[action.payload].count > 1) {
          state.cart[action.payload].count--;
        } else {
          delete state.cart[action.payload];
        }
      }

      state.itemCount--;
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart));
    },
  },
});

export const { setCartItems, addCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
