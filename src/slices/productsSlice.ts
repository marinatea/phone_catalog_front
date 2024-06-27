/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductDetails, ProductT } from '../types';

export interface ProductsState {
  phones: IProductDetails[];
  tablets: IProductDetails[];
  accessories: IProductDetails[];
  allProducts: ProductT[];
  sortedProducts: ProductT[];
  newModels: ProductT[];
  hotPrices: ProductT[];
  selectedProduct: ProductT | null;
  isLoading: boolean;
  error: undefined | string;
}

const initialState: ProductsState = {
  phones: [],
  tablets: [],
  accessories: [],
  allProducts: [],
  sortedProducts: [],
  newModels: [],
  hotPrices: [],
  selectedProduct: null,
  isLoading: true,
  error: undefined,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const productTypes = ['phones', 'tablets', 'accessories', 'products'];

    const [phones, tablets, accessories, allProducts, newModels, hotPrices] =
      await Promise.all([
        ...productTypes.map(type =>
          fetch(`https://phone-catalog-back.onrender.com/${type}`),
        ),
        fetch('https://phone-catalog-back.onrender.com/products/new-models'),
        fetch('https://phone-catalog-back.onrender.com/products/hot-prices'),
      ]);

    const products = {
      phones: (await phones.json()) as IProductDetails[],
      tablets: (await tablets.json()) as IProductDetails[],
      accessories: (await accessories.json()) as IProductDetails[],
      allProducts: (await allProducts.json()) as ProductT[],
      newModels: (await newModels.json()) as ProductT[],
      hotPrices: (await hotPrices.json()) as ProductT[],
    };

    return products;
  },
);

export const fetchSortedProducts = createAsyncThunk(
  'products/fetchSortedProducts',
  async ({
    category,
    sort,
    start,
    limit,
  }: {
    category: string;
    sort: string;
    start: number;
    limit: number;
  }) => {
    const response = await fetch(
      `https://phone-catalog-back.onrender.com/products/sort?category=${category}&sort=${sort}&itemsPerPage=${limit}&page=${start}`,
    );
    const data = await response.json();

    return data as ProductT[];
  },
);

export const fetchProductByItemId = createAsyncThunk(
  'products/fetchProductByItemId',
  async (itemId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://phone-catalog-back.onrender.com/products/item?itemId=${itemId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch product:', error);

      return rejectWithValue('Failed to fetch product');
    }
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
    builder.addCase(fetchSortedProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchSortedProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sortedProducts = action.payload;
    });
    builder.addCase(fetchSortedProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.phones = action.payload.phones;
      state.tablets = action.payload.tablets;
      state.accessories = action.payload.accessories;
      state.allProducts = action.payload.allProducts;
      state.newModels = action.payload.newModels;
      state.hotPrices = action.payload.hotPrices;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProductByItemId.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductByItemId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedProduct = action.payload;
    });
    builder.addCase(fetchProductByItemId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch product';
    });
  },
});

export const { setIsLoading, setError, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
