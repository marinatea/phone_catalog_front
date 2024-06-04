import { useAppDispatch, useCartSelector } from '../../../hooks/reduxHooks';

import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Button from '../../generic/Button/Button';
import CartItem from './components/CartItem/CartItem';
import ModalSuccess from './components/ModalSuccess/ModalSuccess';
import { clearCart } from '../../../slices/cartSlice';
import styles from './CartPage.module.scss';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const CartPage: React.FC = () => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const { itemCount, totalPrice } = useCartSelector(state => state);
  const dispatch = useAppDispatch();
  const { user } = useUser();

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
            dispatch(clearCart(user?.id as string));
          }}
          isDisabled={itemCount === 0}
        />
      </div>
    </main>
  );
};

export default CartPage;
