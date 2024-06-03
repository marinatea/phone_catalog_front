type Props = { productType: 'phones' | 'tablets' | 'accessories' };

import About from '../../ProductDetails/components/Description/About';
import Actions from '../../ProductDetails/components/Actions/Actions';
import { IProductDetails } from '../../../types';
import TechSpecs from '../../ProductDetails/components/Description/TechSpecs';
import styles from './ProductPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useProductsSelector } from '../../../hooks/reduxHooks';
import ProductsSlider from '../../ProductsSlider/ProductsSlider';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import ImagesSelector from './components/ImagesSelector/ImagesSelector';

const ProductPage: React.FC<Props> = ({ productType }) => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const allProducts = useProductsSelector(state => state);
  const { allProducts: products } = useProductsSelector(state => state);

  const product = allProducts[productType].find(prod => prod.id === productId);

  useEffect(() => {
    if (product === undefined && allProducts[productType].length !== 0) {
      navigate('/product-not-found');
    }
  }, [allProducts, navigate, product, productType]);

  const recomendedProducts = useMemo(() => {
    const filteredProducts = [...products].filter(
      p =>
        p.category === product?.category &&
        (p.color === product.color ||
          p.capacity === product.capacity ||
          p.ram === product.ram),
    );

    return filteredProducts.slice(0, 12);
  }, [products, product]);

  return (
    <main className={styles.productPage}>
      <Breadcrumbs />
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
      <div className={styles.suggested}>
        <ProductsSlider
          products={recomendedProducts}
          title="You may also like"
        />
      </div>
    </main>
  );
};

export default ProductPage;
