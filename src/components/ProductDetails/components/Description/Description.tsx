import { FC } from 'react';

import { IProductDetails } from '../../../../types';

import s from './Description.module.scss';

interface Props {
  product: IProductDetails;
}

const Description: FC<Props> = ({ product }) => {
  const {
    description,
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
      <div className={s.about}>
        <h2 title="About" className={s.title}>About</h2>
        <ul>
          {description.map(({ title, text }) => (
            <li className={s.aboutItem}>
              <h3 className={s.aboutItemTitle}>{title}</h3>
              <p className={s.aboutItemText}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.tech}>
        <h2 className={s.title}>Tech specs</h2>
        <ul className={s.techList}>
          {techItems.map(({ title, value }) => (
            <li className={s.techItem}>
              <span className={s.techTitle}>{title}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Description;