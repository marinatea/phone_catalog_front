import { Link } from 'react-router-dom';
import './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to="/" className="footer__logo">
        <img src="/icons/logo.png" alt="logo" />
      </Link>

      <nav className="footer-nav footer__nav">
        <a href="https://github.com/" className="footer-nav__item">
          Github
        </a>
        <a href="/" className="footer-nav__item">
          Contacts
        </a>
        <a href="/" className="footer-nav__item">
          Rights
        </a>
      </nav>

      <div className="top-link">
        <p className="top-link__text footer__top-link">Back to top</p>
        <button>
          <img src="/icons/footer_button.png" alt="button" />
        </button>
      </div>
    </footer>
  );
};
