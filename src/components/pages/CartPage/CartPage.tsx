import { useAppDispatch, useCartSelector } from '../../../hooks/reduxHooks';

import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Button from '../../generic/Button/Button';
import CartItem from './components/CartItem/CartItem';
import ModalSuccess from './components/ModalSuccess/ModalSuccess';
import { removeFromCart } from '../../../slices/cartSlice';
import styles from './CartPage.module.scss';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const CartPage: React.FC = () => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const { cart } = useCartSelector(state => state);

  const dispatch = useAppDispatch();
  const { user } = useUser();

  const totalPrice = Object.values(cart).reduce(
    (totalPrice, item) => totalPrice + item.count * item.price,
    0,
  );

  const itemCount = Object.values(cart).reduce(
    (totalCount, item) => totalCount + item.count,
    0,
  );

  return (
    <main className={styles.cartPage}>
      {isCheckedOut && <ModalSuccess />}
      <Breadcrumbs />
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.cardContainer}>
          <CartItem />
        </div>
      </div>
      <div className={styles.checkoutContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.cashInfo}>${totalPrice}</div>
          <div className={styles.itemInfo}>Total for {itemCount} items</div>
        </div>
        <Button
          title={'Checkout'}
          type="primary"
          className={styles.checkoutButton}
          onClick={() => {
            setIsCheckedOut(true);
            Object.keys(cart).forEach(itemId => {
              dispatch(removeFromCart({ userId: user?.id as string, itemId }));
            });
          }}
          isDisabled={itemCount === 0}
        />
      </div>
    </main>
  );
};

export default CartPage;
