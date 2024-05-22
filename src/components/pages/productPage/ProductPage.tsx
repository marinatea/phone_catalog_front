type Props = {};

import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { useProductsContext } from '../../../context/ProductsContext';
import { useState, useEffect } from 'react';
import { IProductDetails } from '../../../types';
import About from '../../ProductDetails/components/Description/About';
import TechSpecs from '../../ProductDetails/components/Description/TechSpecs';

export default function ProductPage({}: Props) {
  const { productId } = useParams<{ productId: string }>();
  const { phones } = useProductsContext();
  const [phone, setPhone] = useState<IProductDetails | null>(null);
  
  useEffect(() => {
    if (!productId) return;

    const product = phones.find((item) => item.id === productId) || null;
    setPhone(product);

  }, [productId]);



  return (
    <main className={styles.productPage}>
      <h1 className={styles.title}>Name Placeholder</h1>
      <div className={styles.photos}>Photos Placeholder</div>
      <div className={styles.actions}>Actions Placeholder</div>
      <div className={styles.about}><About product={phone}/></div>
      <div className={styles.specs}><TechSpecs product={phone} /></div>
      <div className={styles.suggested}>Suggested Placeholder</div>
    </main>
  );
}
