import React from 'react';
import styles from './Badge.module.scss';
import { useProductsContext } from '../../context/ProductsContext';

const CartBadge: React.FC = () => {
  const { cartItemsCount } = useProductsContext();

  return (
    <div className={styles.cartBadge}>
      <span className={styles.quantity}>{cartItemsCount}</span>
    </div>
  );
};

export default CartBadge;
