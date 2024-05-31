import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import Icon from '../Icon/Icon';
import { Icons } from '../../types';
import CartBadge from '../Badge/Badge';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img className={styles.divLogo} src={'/img/logo.png'} alt="logo" />
      <nav className={styles.navbar}>
        <ul className={styles.navlinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.icons}>
        <NavLink to="/favorites">
          <Icon iconId={Icons.HEART} className={styles.heart} />
        </NavLink>
        <NavLink to="/cart">
          <Icon iconId={Icons.CART} className={styles.cart} />
          <CartBadge />
        </NavLink>
        <div className={styles.union}>
          <Icon iconId={Icons.BURGER} className={styles.burger} />
        </div>
      </div>
    </header>
  );
};

export default Header;
