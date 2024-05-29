import React from 'react';
import styles from './Badge.module.scss';
import { useCartSelector } from '../../hooks/reduxHooks';

const CartBadge: React.FC = () => {
  const { itemCount } = useCartSelector(state => state);

  return (
    <div className={styles.cartBadge}>
      <span className={styles.quantity}>{itemCount}</span>
    </div>
  );
};

export default CartBadge;
