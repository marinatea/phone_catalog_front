import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './ProductsSlider.module.scss';
import { Icons, ProductT } from '../../types';
import ProductCard from '../ProductCard';
import Icon from '../Icon';

type Props = {
  title: string;
  products: ProductT[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [translate, setTranslate] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(272);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newVisibleCards;
      let newCardWidth;

      switch (true) {
        case screenWidth >= 1200:
          newVisibleCards = 5;
          newCardWidth = 272;
          break;
        case screenWidth >= 640:
          newVisibleCards = 2;
          newCardWidth = 237;
          break;
        default:
          newVisibleCards = 1;
          newCardWidth = 223;
          break;
      }

      setVisibleCards(newVisibleCards);
      const newSliderWidth = screenWidth - 16 * (newVisibleCards - 1);
      const adjustedSliderWidth = newSliderWidth > 1136 ? 1136 : newSliderWidth;

      setSliderWidth(adjustedSliderWidth);
      setCardWidth(newCardWidth);
      const maxTranslate = Math.max(
        newCardWidth * products.length - adjustedSliderWidth,
        0,
      );

      setTranslate(prevTranslate => Math.min(prevTranslate, maxTranslate));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [products.length, visibleCards]);

  const maxTranslate = Math.max(
    (cardWidth + 16) * products.length - sliderWidth,
    0,
  );

  const onLeftClick = () => {
    setTranslate(prevTranslate =>
      Math.max(prevTranslate - (cardWidth + 16) * visibleCards, 0),
    );
  };

  const onRightClick = () => {
    setTranslate(prevTranslate =>
      Math.min(prevTranslate + (cardWidth + 16) * visibleCards, maxTranslate),
    );
  };

  const screenWidth = window.innerWidth;

  const rightClickDisabled =
    screenWidth >= 1200
      ? translate >= maxTranslate - sliderWidth * 2
      : translate >= maxTranslate;
  const leftClickDisabled = translate <= 0;

  return (
    <div className={styles.productsSlider}>
      <div className={styles.productsSlider__top}>
        <h1 className={styles.productsSlider__topTitle}>{title}</h1>
        <div className={styles.productsSlider__topButtons}>
          <button
            type="button"
            className={classNames(styles.productsSlider__topButton, {
              [styles.smallButtonDisabled]: leftClickDisabled,
            })}
            onClick={onLeftClick}
            disabled={leftClickDisabled}
          >
            <Icon iconId={Icons.ARROW_LEFT} />
          </button>
          <button
            type="button"
            className={classNames(styles.productsSlider__topButton, {
              [styles.smallButtonDisabled]: rightClickDisabled,
            })}
            onClick={onRightClick}
            disabled={rightClickDisabled}
          >
            <Icon iconId={Icons.ARROW_RIGHT} />
          </button>
        </div>
      </div>
      <div className={styles.productsSlider__wrapper}>
        <div
          className={styles.productsSlider__content}
          style={{
            transform: `translateX(-${translate}px)`,
            width: `${sliderWidth}px`,
          }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} isSlider={true} />
          ))}
        </div>
      </div>
    </div>
  );
};
