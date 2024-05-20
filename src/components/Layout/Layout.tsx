import { Outlet } from 'react-router-dom';

type Props = {};
export default function Layout({}: Props) {
  return (
    <div>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
