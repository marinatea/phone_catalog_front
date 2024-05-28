import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout/Layout';
import PhonesPage from './components/PhonesPage/PhonesPage';
import HomePage from './components/HomePage/HomePage';
import CartPage from './components/CartPage/CartPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import FavoritesPage from './components/pages/FavoritesPage/FavoritesPage';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/reduxHooks';
import { setCartItems } from './slices/cartSlice';
import { LOCAL_CART_KEY } from './constants/localStorageKeys';
import { fetchProducts } from './slices/productsSlice';

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
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route
              path=":productId"
              element={<ProductPage productType={'phones'} />}
            />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
