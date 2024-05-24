import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import Icon from '../Icon/Icon';
import { Icons } from '../../types';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img className={styles.divLogo} src={'/img/Logo.png'} alt="logo" />
      <nav className={styles.navbar}>
        <ul className={styles.navlinks}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/phones">Phones</NavLink>
          </li>
          <li>
            <NavLink to="/tablets">Tablets</NavLink>
          </li>
          <li>
            <NavLink to="/accessories">Accessories</NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.icons}>
        <Icon iconId={Icons.HEART} className={styles.heart} />
        <NavLink to="/cart">
          <Icon iconId={Icons.CART} className={styles.cart} />
        </NavLink>
        <div className={styles.union}>
          <Icon iconId={Icons.BURGER} className={styles.burger} />
        </div>
      </div>
    </header>
  );
};

export default Header;
