type Props = {};

import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { useState, useEffect } from 'react';
import { IProductDetails } from '../../../types';

export default function ProductPage({}: Props) {
  const { productId } = useParams<{ productId: string }>();
  const [_phone, setPhone] = useState<IProductDetails | null>(null);
  
  useEffect(() => {
    if (!productId) return;
    fetch('/api/phones.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const product = data.find((item: IProductDetails) => item.id === productId) || null;
        setPhone(product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


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
