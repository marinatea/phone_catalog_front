/* eslint-disable max-len */
import './App.scss';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CartPage from './components/pages/CartPage/CartPage';
import FavoritesPage from './components/pages/FavoritesPage/FavoritesPage';
import HomePage from './components/pages/HomePage/HomePage';
import { LOCAL_CART_KEY } from './constants/localStorageKeys';
import Layout from './components/layout/Layout';
import LoginPage from './components/pages/LoginPage/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import ProductTypePage from './components/pages/ProductTypePage/ProductTypePage';
import RegistrationPage from './components/pages/RegistrationPage/RegistrationPage';
import { fetchProducts } from './slices/productsSlice';
import { setCartItems } from './slices/cartSlice';
import { useAppDispatch } from './hooks/reduxHooks';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localCart = localStorage.getItem(LOCAL_CART_KEY);
    const cart = localCart ? JSON.parse(localCart) : {};

    dispatch(setCartItems(cart));

    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {['phones', 'tablets', 'accessories'].map(productType => (
            <Route key={productType} path={productType}>
              <Route
                index
                element={
                  <ProductTypePage
                    productsType={
                      productType as 'phones' | 'tablets' | 'accessories'
                    }
                  />
                }
              />
              <Route
                path=":productId"
                element={
                  <ProductPage
                    productType={
                      productType as 'phones' | 'tablets' | 'accessories'
                    }
                  />
                }
              />
            </Route>
          ))}
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
