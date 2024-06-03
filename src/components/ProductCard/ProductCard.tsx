interface Props {
  product: ProductT;
  isSlider?: boolean;
}

import { Icons, ProductT } from '../../types';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../slices/favoriteSlice';
import {
  useAppDispatch,
  useCartSelector,
  useFavoritesSelector,
} from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';

import Button from '../../components/Button/Button';
import Icon from '../Icon/Icon';
import { addCartItem } from '../../slices/cartSlice';
import classnames from 'classnames';
import styles from './ProductCard.module.scss';

const ProductCard: React.FC<Props> = ({ product, isSlider }) => {
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
      className={classnames(
        {
          [styles.sliderCardContainer]: isSlider,
          [styles.container]: !isSlider,
        },
        '__app-PhoneCard-container',
      )}
      data-cy="cardsContainer"
    >
      <a href={`/*`} className={styles.link}>
        <img
          className={classnames({
            [styles.sliderCardImage]: isSlider,
            [styles.image]: !isSlider,
          })}
          src={`/${image}`}
          alt={name}
        />
      </a>
      <a href={`/*`} className={styles.name}>
        {name}
      </a>
      <div className={styles.price}>
        <span className={styles.currentPrice}>{`$${price}`}</span>
        <span className={styles.fullPrice}>{`$${fullPrice}`}</span>
      </div>
      <ul className={styles.detailsList}>
        <li className={styles.detailsItem}>
          <span className={styles.detailsTitle}>Screen</span>
          <span>{screen}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsTitle}>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsTitle}>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>
      <div className={styles.buttons}>
        <Button
          onClick={() => dispatch(addCartItem(cartProduct))}
          isSelected={false}
          className={styles.addToCard}
          title={isProductInCard ? 'Added to cart' : 'Add to cart'}
        />
        <Icon
          onClick={handleFavoriteClick}
          className={styles.addToFavorite}
          iconId={icon}
        />
      </div>
    </div>
  );
};

export default ProductCard;
