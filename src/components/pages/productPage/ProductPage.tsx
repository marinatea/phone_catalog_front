type Props = {};

import { useEffect, useState } from 'react';

import About from '../../ProductDetails/components/Description/About';
import Actions from '../../ProductDetails/components/Actions/Actions';
import { IProductDetails } from '../../../types';
import TechSpecs from '../../ProductDetails/components/Description/TechSpecs';
import styles from './ProductPage.module.scss';
import { useParams } from 'react-router-dom';

export default function ProductPage({}: Props) {
  const { productId } = useParams<{ productId: string }>();
  const [phone, setPhone] = useState<IProductDetails | null>(null);

  useEffect(() => {
    if (!productId) {
      return;
    }

    fetch('/api/phones.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        const product =
          data.find((item: IProductDetails) => item.id === productId) || null;

        setPhone(product);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <main className={styles.productPage}>
      <h1 className={styles.title}>Name Placeholder</h1>
      <div className={styles.photos}>Photos Placeholder</div>
      <div className={styles.actions}>
        <Actions product={phone} />
      </div>
      <div className={styles.about}>
        <About product={phone} />
      </div>
      <div className={styles.specs}>
        <TechSpecs product={phone} />
      </div>
      <div className={styles.suggested}>Suggested Placeholder</div>
    </main>
  );
}
