import { FC } from 'react';
import cn from 'classnames';

import s from './ProductCard.module.scss';
import Button from '../Button';
import { IProductDetails, Icons } from '../../types';


interface Props {
  product: IProductDetails;
}
const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div
      className={cn(s.container, '__app-PhoneCard-container')}
      data-cy="cardsContainer"
    >
      <a href={`/*`} className={s.link}>
        <img className={s.image} src={product.images[0]} alt={product.name} />
      </a>
      <a href={`/*`} className={s.name}>
        {product.name}
      </a>
      <div className={s.price}>
        <span className={s.currentPrice}>{`$${product.priceDiscount}`}</span>
        <span className={s.fullPrice}>{`$${product.priceRegular}`}</span>
      </div>
      <ul className={s.detailsList}>
        <li className={s.detailsItem}>
          <span className={s.detailsTitle}>Screen</span>
          <span>{product.screen}</span>
        </li>
        <li className={s.detailsItem}>
          <span className={s.detailsTitle}>Capacity</span>
          <span>{product.capacity}</span>
        </li>
        <li className={s.detailsItem}>
          <span className={s.detailsTitle}>RAM</span>
          <span>{product.ram}</span>
        </li>
      </ul>
      <div className={s.buttons}>
        <Button
          onClick={() => {}}
          isSelected={false}
          className={s.addToCard}
          title="Add to cart"
        />
        <Button
          onClick={() => { }}
          type="secondary"
          className={s.addToFavorite}
          icon={Icons.HEART}
        />
      </div>
    </div>
  );
};

export default ProductCard;
