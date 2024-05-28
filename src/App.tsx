import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import CartPage from './components/CartPage/CartPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import FavoritesPage from './components/pages/FavoritesPage/FavoritesPage';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/reduxHooks';
import { setCartItems } from './slices/cartSlice';
import { LOCAL_CART_KEY } from './constants/localCartKey';
import { fetchProducts } from './slices/productsSlice';
import ProductTypePage from './components/ProductTypePage/ProductTypePage';

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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
