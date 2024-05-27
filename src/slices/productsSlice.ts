/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductDetails } from '../types';

export interface ProductsState {
  phones: IProductDetails[];
  tablets: IProductDetails[];
  accessories: IProductDetails[];
  isLoading: boolean;
  error: undefined | string;
}

const initialState: ProductsState = {
  phones: [],
  tablets: [],
  accessories: [],
  isLoading: true,
  error: undefined,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const productTypes = ['phones', 'tablets', 'accessories'];

    const [phones, tablets, accessories] = await Promise.all(
      productTypes.map(type => fetch(`/api/${type}.json`)),
    );

    const products = {
      phones: (await phones.json()) as IProductDetails[],
      tablets: (await tablets.json()) as IProductDetails[],
      accessories: (await accessories.json()) as IProductDetails[],
    };

    return products;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setProducts: (
      state,
      action: PayloadAction<{
        phones: IProductDetails[];
        tablets: IProductDetails[];
        accessories: IProductDetails[];
      }>,
    ) => {
      state.phones = action.payload.phones;
      state.tablets = action.payload.tablets;
      state.accessories = action.payload.accessories;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.phones = action.payload.phones;
      state.tablets = action.payload.tablets;
      state.accessories = action.payload.accessories;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setIsLoading, setError, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
