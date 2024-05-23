import { Outlet } from 'react-router-dom';
import { ProductsProvider } from '../../context/ProductsContext';
import Header from '../Header/Header';

type Props = {};
export default function Layout({ }: Props) {
  return (
    <>
      <Header />

      <ProductsProvider>
        <Outlet />
      </ProductsProvider>

      {/* <Footer /> */}
    </>
  );
}
