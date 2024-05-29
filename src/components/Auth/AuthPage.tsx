import Login from '../Login/Login';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
  return (
    <main className={styles.authPage}>
      <Login />
    </main>
  );
};

export default AuthPage;
