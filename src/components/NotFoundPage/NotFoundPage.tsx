import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.all}>
      <Breadcrumbs />
      <h1 className={styles.title}>Page not found</h1>
      <img
        className={styles.photo}
        src={'/img/product-not-found.png'}
        alt="not found page"
      />
    </div>
  );
};

export default NotFoundPage;
