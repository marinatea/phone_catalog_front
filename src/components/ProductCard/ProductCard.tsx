import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import s from './ProductCard.module.scss';
import Button from '../../components/Button';
import { Icons, ProductT } from '../../types';
import {
  useAppDispatch,
  useCartSelector,
  useFavoritesSelector,
} from '../../hooks/reduxHooks';
import { addCartItem } from '../../slices/cartSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../slices/FavoriteSlice';
import Icon from '../Icon';

interface Props {
  product: ProductT;
  isSlider?: boolean;
}
const ProductCard: FC<Props> = ({ product, isSlider }) => {
  const { cart } = useCartSelector(state => state);
  const { favorites } = useFavoritesSelector(state => state);
  const dispatch = useAppDispatch();

  const {
    itemId: id,
    name,
    capacity,
    ram,
    price,
    fullPrice,
    screen,
    image,
  } = product;

  const isProductInCard = Object.hasOwn(cart, id);

  const cartProduct = {
    id,
    name,
    image,
    price,
  };

  const favoriteCard: ProductT = {
    name: product.name,
    capacity,
    color: product.color,
    screen,
    ram,
    id: product.id,
    category: 'phones',
    itemId: product.itemId,
    fullPrice: product.fullPrice,
    price: product.price,
    year: product.year,
    image: product.image,
  };

  const isProductInFavorites = favorites.some(item => item.name === name);

  const [icon, setIcon] = useState(
    isProductInFavorites ? Icons.HEART_FILL : Icons.HEART,
  );

  useEffect(() => {
    setIcon(
      favorites.some(item => item.name === name)
        ? Icons.HEART_FILL
        : Icons.HEART,
    );
  }, [favorites, name]);

  const handleFavoriteClick = () => {
    if (isProductInFavorites) {
      dispatch(removeFromFavorites(favoriteCard.name));

      setIcon(Icons.HEART);
    } else {
      dispatch(addToFavorites(favoriteCard));

      setIcon(Icons.HEART_FILL);
    }
  };

  return (
    <div
      className={cn(
        {
          [s.sliderCardContainer]: isSlider,
          [s.container]: !isSlider,
        },
        '__app-PhoneCard-container',
      )}
      data-cy="cardsContainer"
    >
      <a href={`/*`} className={s.link}>
        <img
          className={cn({
            [s.sliderCardImage]: isSlider,
            [s.image]: !isSlider,
          })}
          src={image}
          alt={name}
        />
      </a>
      <a href={`/*`} className={s.name}>
        {name}
      </a>
      <div className={s.price}>
        <span className={s.currentPrice}>{`$${price}`}</span>
        <span className={s.fullPrice}>{`$${fullPrice}`}</span>
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
          onClick={() => dispatch(addCartItem(cartProduct))}
          isSelected={false}
          className={s.addToCard}
          title={isProductInCard ? 'Added to cart' : 'Add to cart'}
        />
        <Icon
          onClick={handleFavoriteClick}
          className={s.addToFavorite}
          iconId={icon}
        />
      </div>
    </div>
  );
};

export default ProductCard;
