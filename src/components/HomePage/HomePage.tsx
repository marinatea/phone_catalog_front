type Props = {};

import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';

export default function HomePage({}: Props) {
  const [categories, setCategories] = useState([
    { title: 'Mobile phones', type: 'phones', count: 0 },
    { title: 'Tablets', type: 'tablets', count: 0 },
    { title: 'Accessories', type: 'accessories', count: 0 },
  ]);

  useEffect(() => {
    if (categories[0].count === 0) {
      categories.forEach(({ type }, i) => {
        fetch(`/api/${type}.json`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            return response.json();
          })
          .then(data => {
            setCategories(prevCats => {
              const newCats = [...prevCats];

              newCats[i].count = data.length;

              return newCats;
            });
          });
      }, []);
    }
  });

  return (
    <main className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.slider}>Slider placeholder</div>
      <div className={styles.newModels}>New Models placeholder</div>
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
      <div className={styles.hotPrices}>Hot prices placeholder</div>
    </main>
  );
}
