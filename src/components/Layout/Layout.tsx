import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

type Props = {};
export default function Layout({ }: Props) {
  
  return (
    <>
      {/* <Header /> */}
      <main className={`${styles['page-grid']}`}>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
}
