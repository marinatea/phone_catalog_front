import { FC } from 'react';
import styles from './CartItem.module.scss';
import { useProductsContext } from '../../context/ProductsContext';
import { Icons } from '../../types';
import Button from '../Button';

const CartItem: FC = () => {
  const { phones, isItemInCart } = useProductsContext();

  const itemsInCart = phones.filter(phone => isItemInCart(phone.id));

  return (
    <div className={styles.cartItemContainer}>
      {itemsInCart.map(phone => (
        <div className={styles.cartItem} key={phone.id}>
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
                src={phone.images[0]}
                alt={phone.name}
              />
            </div>
            <a href={`/*`} className={styles.name}>
              {phone.name}
            </a>
          </div>
          <div className={styles.secondRow}>
            <div className={styles.counter}>
              <Button
                onClick={() => {}}
                type="secondary"
                className={styles.minusButton}
                icon={Icons.MINUS}
              />
              <div className={styles.count}>1</div>
              <Button
                onClick={() => {}}
                type="secondary"
                className={styles.plusButton}
                icon={Icons.PLUS}
              />
            </div>
            <div className={styles.price}>${phone.priceDiscount}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
