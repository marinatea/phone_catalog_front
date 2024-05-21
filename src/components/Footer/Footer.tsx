import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.footer__logo}>
        <img src="/icons/logo.png" alt="logo" />
      </Link>

      <nav className={`${styles['footer-nav']} ${styles.footer__nav}`}>
        <a href="https://github.com/" className={styles['footer-nav__item']}>
          Github
        </a>
        <a href="/" className={styles['footer-nav__item']}>
          Contacts
        </a>
        <a href="/" className={styles['footer-nav__item']}>
          Rights
        </a>
      </nav>

      <div className={styles['top-link']}>
        <p
          className={styles['top-link__text']}
          onClick={() => window.scrollTo(0, 0)}
        >
          Back to top
        </p>
        <button>
          <img src="/icons/footer_button.png" alt="button" />
        </button>
      </div>
    </footer>
  );
};
