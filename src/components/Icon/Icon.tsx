import { FC } from 'react';
import s from './Icon.module.scss';
import cn from 'classnames';



interface Props {
  iconId: string;
  className?: string;
}
const Icon: FC<Props> = ({ iconId, className }) => {
  return (
    <svg className={cn(s.container, className)}>
      <use href={`img/sprite.svg#${iconId}`} />
    </svg>
  );
};

export default Icon;