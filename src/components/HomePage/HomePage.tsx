type Props = {};

import { useMemo } from 'react';
import styles from './HomePage.module.scss';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import { useProductsSelector } from '../../hooks/reduxHooks';
import { Banner } from '../Banner/Banner';

export default function HomePage({}: Props) {
  const { phones, tablets, accessories, allProducts } = useProductsSelector(
    state => state,
  );

  const categories = [
    { title: 'Mobile phones', type: 'phones', count: phones.length },
    { title: 'Tablets', type: 'tablets', count: tablets.length },
    { title: 'Accessories', type: 'accessories', count: accessories.length },
  ];

  const newModelProducts = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => {
        return b.year - a.year;
      })
      .slice(0, 20);
  }, [allProducts]);
  
  const hotPriceProducts = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => {
        return b.fullPrice - b.price - (a.fullPrice - a.price);
      })
      .slice(0, 16);
  }, [allProducts]);

  return (
    <main className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.slider}>
        <Banner />
      </div>
      <div className={styles.newModels}>
        <ProductsSlider title="Brand new models" products={newModelProducts} />
      </div>
      <div className={styles.categories}>
        <h2 className={styles.categoriesTitle}>Shop by category</h2>
        {categories[0].count !== 0 &&
          categories.map(({ title, type, count }) => (
            <div className={styles.categoryContainer} key={type}>
              <div className={styles.categoryImgContainer}>
                <img
                  className={styles.categoryImg}
                  src={`/img/category-${type}.png`}
                  alt="category"
                />
              </div>
              <h4 className={styles.categoryTitle}>{title}</h4>
              <p className={styles.categoryCount}>{count} models</p>
            </div>
          ))}
      </div>
      <div className={styles.hotPrices}><ProductsSlider products={hotPriceProducts} title='Hot prices' /></div>
    </main>
  );
}
