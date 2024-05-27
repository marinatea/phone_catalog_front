import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ProductsState } from '../slices/productsSlice';
import { CartState } from '../slices/cartSlice';

export const useProductsSelector = <T>(selector: (state: ProductsState) => T) =>
  useSelector<RootState, T>(state => selector(state.products));

export const useCartSelector = <T>(selector: (state: CartState) => T) =>
  useSelector<RootState, T>(state => selector(state.cart));
