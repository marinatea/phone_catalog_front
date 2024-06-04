/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
        products: { [productId: string]: ICartProduct & { count: number } };
        userId: string;
      }>,
    ) => {
      state.cart = action.payload.products;

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
    addCartItem: (
      state,
      action: PayloadAction<{ product: ICartProduct; userId: string }>,
    ) => {
      state.itemCount++;
      state.totalPrice += action.payload.product.price;

      if (Object.hasOwn(state.cart, action.payload.product.id)) {
        state.cart[action.payload.product.id].count++;
      } else {
        state.cart[action.payload.product.id] = {
          ...action.payload.product,
          count: 1,
        };
      }

      localStorage.setItem(
        LOCAL_CART_KEY + action.payload.userId,
        JSON.stringify(state.cart),
      );
    },
    removeCartItem: (
      state,
      action: PayloadAction<{ productId: string; userId: string }>,
    ) => {
      state.itemCount--;
      state.totalPrice -= state.cart[action.payload.productId].price;

      if (Object.hasOwn(state.cart, action.payload.productId)) {
        if (state.cart[action.payload.productId].count > 1) {
          state.cart[action.payload.productId].count--;
        } else {
          delete state.cart[action.payload.productId];
        }
      }

      localStorage.setItem(
        LOCAL_CART_KEY + action.payload.userId,
        JSON.stringify(state.cart),
      );
    },
    removeCartItemsType: (
      state,
      action: PayloadAction<{ productId: string; userId: string }>,
    ) => {
      const thisItemCount = state.cart[action.payload.productId].count;

      state.itemCount -= thisItemCount;
      state.totalPrice -=
        state.cart[action.payload.productId].price * thisItemCount;
      delete state.cart[action.payload.productId];
      localStorage.setItem(
        LOCAL_CART_KEY + action.payload.userId,
        JSON.stringify(state.cart),
      );
    },
    clearCart: (state, action: PayloadAction<string>) => {
      state.itemCount = 0;
      state.totalPrice = 0;
      state.cart = {};
      localStorage.setItem(LOCAL_CART_KEY + action.payload, JSON.stringify({}));
    },
  },
});

export const {
  setCartItems,
  addCartItem,
  removeCartItem,
  removeCartItemsType,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
