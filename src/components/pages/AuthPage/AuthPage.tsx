import { Route, Routes } from 'react-router-dom';

import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
  return (
    <main className={styles.authPage}>
      <Breadcrumbs />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Routes>
    </main>
  );
};

export default AuthPage;
