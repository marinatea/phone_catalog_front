import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import Icon from '../Icon/Icon';
import { Icons } from '../../types';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <img className={styles.divLogo} src={'/img/Logo.png'} alt="logo" />
      <nav className={styles.navbar}>
        <ul className={styles.navlinks}>
          <li>
            <NavLink
              to="/"
              className={location.pathname === '/' ? styles.active : ''}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={location.pathname === '/phones' ? styles.active : ''}
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={location.pathname === '/tablets' ? styles.active : ''}
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={
                location.pathname === '/accessories' ? styles.active : ''
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.icons}>
        <Icon iconId={Icons.HEART} className={styles.heart} />
        <Icon iconId={Icons.CART} className={styles.cart} />
        <div className={styles.union}>
          <Icon iconId={Icons.BURGER} className={styles.burger} />
        </div>
      </div>
    </header>
  );
};

export default Header;
