type Props = { productType: 'phone' | 'tablet' | 'accessory' };

import { useEffect, useState } from 'react';

import About from '../../ProductDetails/components/Description/About';
import Actions from '../../ProductDetails/components/Actions/Actions';
import { IProductDetails } from '../../../types';
import TechSpecs from '../../ProductDetails/components/Description/TechSpecs';
import styles from './ProductPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductPage({ productType }: Props) {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProductDetails | null>(null);
  const navigate = useNavigate();
  const productUrl = `/api/${productType}s.json`;

  useEffect(() => {
    fetch(productUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        const tempProduct =
          data.find((item: IProductDetails) => item.id === productId) || null;

        if (tempProduct === null) {
          navigate('/product-not-found');
        }

        setProduct(tempProduct);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, [productId, productUrl, navigate]);

  return (
    <main className={styles.productPage}>
      <h1 className={styles.title}>Name Placeholder</h1>
      <div className={styles.photos}>Photos Placeholder</div>
      <div className={styles.actions}>
        <Actions product={product} />
      </div>
      <div className={styles.about}>
        <About product={product} />
      </div>
      <div className={styles.specs}>
        <TechSpecs product={product} />
      </div>
      <div className={styles.suggested}>Suggested Placeholder</div>
    </main>
  );
}
