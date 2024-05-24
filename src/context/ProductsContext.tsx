/* eslint-disable */
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ICartProduct, IProductDetails, ProductT } from '../types';

interface IProductsContext {
  products: ProductT[];
  phones: IProductDetails[];
  isItemInCart: (productId: string) => boolean;
  addItem: (product: ICartProduct) => void;
}

export const ProductsContext = createContext<IProductsContext>({
  products: [],
  phones: [],
  isItemInCart: () => false,
  addItem: (_product: ICartProduct) => {},
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

  const [products, setProducts] = useState<ProductT[]>([]);
  const [phones, setPhones] = useState<IProductDetails[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);

  const [cartItems, setCartItems] = useState<CartItems>(() => {
    const item = localStorage.getItem(CART_STORAGE_KEY);

    return item ? JSON.parse(item) : {};
  });

  const isItemInCart = (id: string) => !!cartItems[id];

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
    fetch('/api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        setProducts(data);
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
        products,
        phones,
        isItemInCart,
        addItem,
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
