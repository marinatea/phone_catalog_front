import { Outlet } from 'react-router-dom';
import { ProductsProvider } from '../../context/ProductsContext';
import { Footer } from '../Footer/Footer';

type Props = {};
export default function Layout({}: Props) {
  return (
    <>
      {/* <Header /> */}

      <ProductsProvider>
        <Outlet />
      </ProductsProvider>

      {<Footer />}
    </>
  );
}
