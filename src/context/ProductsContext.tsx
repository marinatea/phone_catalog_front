/* eslint-disable */
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ICartProduct, IProductDetails } from '../types';

interface IProductsContext {
  phones: IProductDetails[];
  isItemInCart: (productId: string) => boolean;
  addItem: (product: ICartProduct) => void;
  cartItemsCount: number;
}

export const ProductsContext = createContext<IProductsContext>({
  phones: [],
  isItemInCart: () => false,
  addItem: (_product: ICartProduct) => {},
  cartItemsCount: 0,
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

  const isItemInCart = (id: string) => !!cartItems[id];

  const cartItemsCount = useMemo(() => {
    return Object.values(cartItems).reduce((acc, { count }) => acc + count, 0);
  }, [cartItems]);

  const addItem = (product: ICartProduct) => {
    setCartItems(prevCartItems => {
      const prevProduct = prevCartItems[product.id];

      return {
        ...prevCartItems,
        [product.id]: prevProduct
          ? { ...prevProduct, count: prevProduct.count + 1 }
          : { product, count: 1 },
      };
    });
  };

  useEffect(() => {
    fetch('/api/phones.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        setPhones(data);
        setLoading(false);
      })
      .catch(error => {
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
        isItemInCart,
        addItem,
        cartItemsCount,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (): IProductsContext => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider',
    );
  }

  return context;
};
