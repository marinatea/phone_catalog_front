import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import styles from './FavoritesPage.module.scss';
import ProductCard from '../../ProductCard/ProductCard';
import { useFavoritesSelector } from '../../../hooks/reduxHooks';
import { ProductT } from '../../../types';
import { FavoritesState } from '../../../slices/favoriteSlice';

const FavoritesPage: React.FC = () => {
  const favorites = useFavoritesSelector(
    (state: FavoritesState) => state.favorites,
  );

  return (
    <main className={styles.favoritesPage}>
      <Breadcrumbs />
      <h1 className={styles.title}>Favorites</h1>
      <span className={styles.subText}>{favorites.length} items</span>
      <div className={styles.cardsContainer}>
        {favorites.map((product: ProductT, index: number) => (
          <ProductCard
            key={product.name ? `${product.name}-${index}` : `product_${index}`}
            product={product}
          />
        ))}
      </div>
    </main>
  );
};

export default FavoritesPage;
