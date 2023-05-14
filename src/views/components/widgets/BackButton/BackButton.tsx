import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../services/app/hooks';

import { IconType } from '../../../../data/types/enums';
import { Icon } from '../../ui/Icon';
import './BackButton.scss';

export const BackButton: React.FC = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <Link
      to="/"
      className={classNames(
        'back-button', {
        'back-button--dark': isDarkMode,
      })}
      type="button"
      data-testid="back-button"
    >
      <Icon
        type={isDarkMode
          ? IconType.ARROW_LEFT_DARK
          : IconType.ARROW_LEFT}
        addClassName="back-button__arrow"
      />

      Back
    </Link>
  );
}
