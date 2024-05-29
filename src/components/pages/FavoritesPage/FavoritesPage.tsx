type Props = {};

import styles from './FavoritesPage.module.scss';

export default function FavoritesPage({}: Props) {
  return (
    <main className={styles.favoritesPage}>
      <h1 className={styles.title}>Favorites</h1>
      {/* <span className={styles.subText}>{[].length} items</span>

      <div className={styles.cardsContainer}>
        {[].map(phone => (
          <ProductCard key={phone.id} product={phone} />
        ))}
      </div> */}
    </main>
  );
}
