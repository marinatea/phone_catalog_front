import { NavLink, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import Icon from '../Icon';
import { Icons } from '../../types';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(pathname => pathname);

  const formatBreadcrumb = (breadcrumb: string) => {
    return breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);
  };

  return (
    <ol className={styles.breadcrumbs}>
      <li>
        <NavLink to="/">
          <Icon iconId={Icons.HOME} className={styles.home} />
        </NavLink>
        <Icon iconId={Icons.ARROW_RIGHT} className={styles.arrowRight} />
      </li>
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <li key={pathname}>
            {isLast ? (
              <span>{formatBreadcrumb(pathname)}</span>
            ) : (
              <NavLink to={routeTo}>{formatBreadcrumb(pathname)}</NavLink>
            )}
          </li>
        );
      })}
    </ol>
  );
};
