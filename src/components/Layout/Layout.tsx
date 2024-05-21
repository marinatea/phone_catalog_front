import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { ProductsProvider } from '../../context/ProductsContext';

type Props = {};
export default function Layout({}: Props) {
  return (
    <>
      {/* <Header /> */}
      <main className={`${styles['page-grid']}`}>
        <ProductsProvider>
          <Outlet />
        </ProductsProvider>
      </main>

      {/* <Footer /> */}
    </>
  );
}
