import { FC } from 'react';
import styles from './CartItem.module.scss';
import { Icons } from '../../types';
import Button from '../Button';
import { useAppDispatch, useCartSelector } from '../../hooks/reduxHooks';
import { addCartItem, removeCartItem } from '../../slices/cartSlice';

const CartItem: FC = () => {
  const { cart } = useCartSelector(state => state);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.cartItemContainer}>
      {Object.values(cart).map(product => {
        return (
          <div className={styles.cartItem} key={product.id}>
            <div className={styles.firstRow}>
              <Button
                onClick={() => {}}
                className={styles.closeIcon}
                title=""
                type="secondary"
                icon={Icons.CLOSE}
              />
              <div className={styles.phoneContainer}>
                <img
                  className={styles.image}
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <a href={`/*`} className={styles.name}>
                {product.name}
              </a>
            </div>
            <div className={styles.secondRow}>
              <div className={styles.counter}>
                <Button
                  onClick={() => {
                    dispatch(removeCartItem(product.id));
                  }}
                  type="secondary"
                  className={styles.minusButton}
                  icon={Icons.MINUS}
                />
                <div className={styles.count}>{product.count}</div>
                <Button
                  onClick={() => {
                    dispatch(addCartItem(product));
                  }}
                  type="secondary"
                  className={styles.plusButton}
                  icon={Icons.PLUS}
                />
              </div>
              <div className={styles.price}>${product.price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
