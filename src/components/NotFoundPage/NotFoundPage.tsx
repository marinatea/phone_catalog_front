import styles from './NotFoundPage.module.scss';

type Props = {};

export default function NotFoundPage({}: Props) {
  return (
    <div className={styles.all}>
      <h1 className={styles.title}>Page not found</h1>
      <img
        className={styles.photo}
        src={'/img/product-not-found.png'}
        alt="not found page"
      />
    </div>
  );
}
