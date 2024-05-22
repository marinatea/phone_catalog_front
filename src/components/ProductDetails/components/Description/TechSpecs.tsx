import { IProductDetails } from '../../../../types';

import s from './Description.module.scss';

interface Props {
  product: IProductDetails | null;
}

export default function TechSpecs({ product }: Props) {
  if (!product) {
    return;
  }
  const {
    screen,
    resolution,
    processor,
    ram,
    camera,
    capacity,
    zoom,
    cell,
  } = product;

  const techItems = [
    {
      title: 'Screen',
      value: screen,
    },
    {
      title: 'Resolution',
      value: resolution,
    },
    {
      title: 'Processor',
      value: processor,
    },
    {
      title: 'Ram',
      value: ram,
    },
    {
      title: 'Built in memory',
      value: capacity,
    },
    {
      title: 'Camera',
      value: camera,
    },
    {
      title: 'Zoom',
      value: zoom,
    },
    {
      title: 'Cell',
      value: cell.join(', '),
    },
  ];

  return (
    <>
      <div className={s.tech}>
        <h2 className={s.title}>Tech specs</h2>
        <ul className={s.techList}>
          {techItems.map(({ title, value }) => (
            <li key={title} className={s.techItem}>
              <span className={s.techTitle}>{title}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
