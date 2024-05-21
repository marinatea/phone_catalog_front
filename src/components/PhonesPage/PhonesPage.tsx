type Props = {};
import { useProductsContext } from '../../context/ProductsContext';
import ProductCard from '../ProductCard';
import styles from './PhonesPage.module.scss';

export default function PhonesPage({}: Props) {
  const { phones } = useProductsContext();

  return (
    <main className={styles.phonesPage}>
      <h1 className={styles.title}>Mobile Phones</h1>
      <span className={styles.subText}>95 models</span>
      <div className={styles.filter}>Sort placeholder</div>
      <div className={styles.filter}>Items placeholder</div>
      <div className={styles.cardsContainer}>
        {phones.map(phone => (
          <ProductCard key={phone.id} phone={phone} />
        ))}
      </div>
      <div className={styles.pageSelector}>Selector placeholder</div>
    </main>
  );
}
