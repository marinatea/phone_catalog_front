import { FC } from 'react';
import cn from 'classnames';

import s from './ProductCard.module.scss';
import Button from '../Button';
import { IProductDetails, Icons } from '../../types';
import { useProductsContext } from '../../context/ProductsContext';


interface Props {
  product: IProductDetails;
}
const ProductCard: FC<Props> = ({ product }) => {
  const { isItemInCart, addItem } = useProductsContext();
  const { id, name, capacity, ram, priceDiscount, priceRegular, screen, images } = product;
  
  const isProductInCard = isItemInCart(id);

  const cartProduct = {
    id,
    name,
    image: images[0],
    price:priceDiscount
  };
  
  return (
    <div
      className={cn(s.container, '__app-PhoneCard-container')}
      data-cy="cardsContainer"
    >
      <a href={`/*`} className={s.link}>
        <img className={s.image} src={images[0]} alt={name} />
      </a>
      <a href={`/*`} className={s.name}>
        {name}
      </a>
      <div className={s.price}>
        <span className={s.currentPrice}>{`$${priceDiscount}`}</span>
        <span className={s.fullPrice}>{`$${priceRegular}`}</span>
      </div>
      <ul className={s.detailsList}>
        <li className={s.detailsItem}>
          <span className={s.detailsTitle}>Screen</span>
          <span>{screen}</span>
        </li>
        <li className={s.detailsItem}>
          <span className={s.detailsTitle}>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li className={s.detailsItem}>
          <span className={s.detailsTitle}>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>
      <div className={s.buttons}>
        <Button
          onClick={() => addItem(cartProduct)}
          isSelected={false}
          className={s.addToCard}
          title={isProductInCard ? 'Added to cart' : 'Add to cart'}
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
