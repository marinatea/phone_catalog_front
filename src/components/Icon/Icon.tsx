import { FC } from 'react';
import s from './Icon.module.scss';
import cn from 'classnames';

interface Props {
  iconId: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
const Icon: FC<Props> = ({ iconId, className, onClick, disabled }) => {
  return (
    <svg
      className={cn(s.container, className, { [s.disabled]: disabled })}
      onClick={!disabled ? onClick : undefined}
    >
      <use href={`/img/sprite.svg#${iconId}`} />
    </svg>
  );
};

export default Icon;
