type Props = {};
import Button from '../Button';
import styles from './CartPage.module.scss';

export default function CartPage({}: Props) {
  return (
    <main className={styles.cartPage}>
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.cardContainer}>Card Placeholder</div>
        <div className={styles.cardContainer}>Card Placeholder</div>
        <div className={styles.cardContainer}>Card Placeholder</div>
        <div className={styles.cardContainer}>Card Placeholder</div>
        <div className={styles.cardContainer}>Card Placeholder</div>
      </div>
      <div className={styles.checkoutContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.cashInfo}>$2657</div>
          <div className={styles.itemInfo}>Total for 3 items</div>
        </div>
        <Button
          title={'Checkout'}
          type="primary"
          className={styles.checkoutButton}
        />
      </div>
    </main>
  );
}
