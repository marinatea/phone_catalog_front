import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import { Footer } from '../Footer/Footer';

type Props = {};
export default function Layout({}: Props) {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}
