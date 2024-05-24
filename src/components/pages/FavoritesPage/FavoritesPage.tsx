type Props = {};
import { useProductsContext } from '../../../context/ProductsContext';
import ProductCard from '../../ProductCard';
import styles from './FavoritesPage.module.scss';

export default function FavoritesPage({}: Props) {
  const { phones: tempFaves } = useProductsContext();

  return (
    <main className={styles.favoritesPage}>
      <h1 className={styles.title}>Favorites</h1>
      <span className={styles.subText}>{tempFaves.length} items</span>

      <div className={styles.cardsContainer}>
        {/* no faves state yet */}
        {tempFaves.map(phone => (
          <ProductCard key={phone.id} product={phone} />
        ))}
      </div>
    </main>
  );
}
