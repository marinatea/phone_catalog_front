import { NavLink } from 'react-router-dom';
import Button from '../Button';
import styles from './ModalSuccess.module.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export const ModalSuccess = () => {
  return (
    <div id="success-modal" className={styles.modal}>
      <div className={styles.modalContent}>
        <Breadcrumbs />
        <h2 className={styles.title}>
          Thank you for your purchase! <span>&#x1F49C;</span>
        </h2>
        <p>
          Your order has been successfully placed. Confirmation has been sent to
          your email address.
        </p>
        <div className={styles.buttonContainer}>
          <NavLink to={'/'} className={styles.link}>
            <Button
              title="To Home"
              className={`${styles.button} ${styles.secondary}`}
            />
          </NavLink>
          <NavLink to={'/phones'} className={styles.link}>
            <Button
              title="Continue Shopping"
              className={`${styles.button} ${styles.secondary}`}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
