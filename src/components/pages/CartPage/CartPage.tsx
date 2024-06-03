import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Button from '../../generic/Button/Button';
import CartItem from './components/CartItem/CartItem';
import styles from './CartPage.module.scss';
import { useCartSelector } from '../../../hooks/reduxHooks';

const CartPage: React.FC = () => {
  const { itemCount, totalPrice } = useCartSelector(state => state);

  return (
    <main className={styles.cartPage}>
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
        />
      </div>
    </main>
  );
};

export default CartPage;
