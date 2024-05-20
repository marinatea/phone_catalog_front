import { FC } from 'react';
import cn from 'classnames';
import Icon from '../Icon';

import s from './Button.module.scss';
export enum Icons {
  LOGO = 'logo-icon',
  HEART = 'heart-icon',
  HEART_FILL = 'heart-fill-icon',
  CART = 'cart-icon',
  ARROW_LEFT = 'arrow-left-icon',
  ARROW_RIGHT = 'arrow-right-icon',
  ARROW_BOTTOM = 'arrow-bottom-icon',
  ARROW_TOP = 'arrow-top-icon',
  HOME = 'home-icon',
  SEARCH = 'search-icon',
  MINUS = 'minus-icon',
  PLUS = 'plus-icon',
  CLOSE = 'close-icon',
}
interface Props {
  onClick?: VoidFunction;
  icon?: Icons;
  title?: string | number;
  type?: 'primary' | 'secondary' | 'rounded' | 'transparent';
  isDisabled?: boolean;
  isSelected?: boolean;
  className?: string;
}
const Button: FC<Props> = ({
  type = 'primary',
  onClick = ()=> {},
  isDisabled = false,
  isSelected = false,
  className,
  title,
  icon,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={cn(s.container, className, {
        [s.isDisabled]: isDisabled,
        [s.isSpaceBetween]: !!title && !!icon,
        [s.primary]: type === 'primary',
        [s.secondary]: type === 'secondary',
        [s.transparent]: type === 'transparent',
        [s.selected]: isSelected,
      })}
    >
      {title}
      {icon && <Icon iconId={icon} />}
    </button>
  );
};

export default Button;