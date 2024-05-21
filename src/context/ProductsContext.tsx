import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { ICartProduct, IProductDetails } from '../types';

interface IProductsContext {
  phones: IProductDetails[];
}


export const ProductsContext = createContext<IProductsContext>({
  phones: [],
});

interface ICartItem {
  count: number;
  product: ICartProduct;
}
type CartItems = {
  [key: string]: ICartItem;
};


interface Props {
  children: React.ReactNode;
}


export const ProductsProvider: FC<Props> = ({ children }) => {
  const CART_STORAGE_KEY = 'cart_catalog';

  const [phones, setPhones] = useState<IProductDetails[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);

  const [cartItems, setCartItems] = useState<CartItems>(() => {
    const item = localStorage.getItem(CART_STORAGE_KEY);
    return item ? JSON.parse(item) : {};
  });

  useEffect(() => {
    fetch('/api/phones.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPhones(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <ProductsContext.Provider
      value={{
        phones,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (): IProductsContext => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }

  return context;
};