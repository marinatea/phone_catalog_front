type Props = {};

import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';

export default function ProductPage({}: Props) {
  const { productId } = useParams();

  return (
    <main className={styles.productPage}>
      <h1 className={styles.title}>Name Placeholder</h1>
      <div className={styles.photos}>Photos Placeholder</div>
      <div className={styles.actions}>Actions Placeholder</div>
      <div className={styles.about}>About Placeholder</div>
      <div className={styles.specs}>Specs Placeholder</div>
      <div className={styles.suggested}>Suggested Placeholder</div>
    </main>
  );
}
