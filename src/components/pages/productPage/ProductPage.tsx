type Props = { productType: 'phones' | 'tablets' | 'accessories' };

import About from '../../ProductDetails/components/Description/About';
import Actions from '../../ProductDetails/components/Actions/Actions';
import { IProductDetails } from '../../../types';
import TechSpecs from '../../ProductDetails/components/Description/TechSpecs';
import styles from './ProductPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import ImagesSelector from './components/ImagesSelector/ImagesSelector';
import { useEffect } from 'react';
import { useProductsSelector } from '../../../hooks/reduxHooks';

export default function ProductPage({ productType }: Props) {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const allProducts = useProductsSelector(state => state);

  const product = allProducts[productType].find(prod => prod.id === productId);

  useEffect(() => {
    if (product === undefined && allProducts[productType].length !== 0) {
      navigate('/product-not-found');
    }
  }, [allProducts, navigate, product, productType]);

  return (
    <main className={styles.productPage}>
      <h1 className={styles.title}>{product?.name}</h1>
      <div className={styles.photos}>
        <ImagesSelector images={product?.images} />
      </div>

      <div className={styles.actions}>
        <Actions product={product as IProductDetails} />
      </div>
      <div className={styles.about}>
        <About product={product as IProductDetails} />
      </div>
      <div className={styles.specs}>
        <TechSpecs product={product as IProductDetails} />
      </div>
      <div className={styles.suggested}>Suggested Placeholder</div>
    </main>
  );
}
