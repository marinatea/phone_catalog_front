import { IProductDetails } from '../../../../types';

import s from './Description.module.scss';

interface Props {
  product: IProductDetails | null;
}

export default function About({ product }: Props) {
  return (
    <>
      {product &&
        <div className={s.about}>
        <h2 title="About" className={s.title}>
          About
        </h2>
        <ul>
          {product.description.map(({ title, text }) => (
            <li key={title} className={s.aboutItem}>
              <h3 className={s.aboutItemTitle}>{title}</h3>
              <p className={s.aboutItemText}>{text}</p>
            </li>
          ))}
        </ul>
      </div>}
    </>
  );
}
