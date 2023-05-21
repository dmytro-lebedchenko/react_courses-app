import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { IconType } from '../../../../data/types/enums';
import { useAppSelector } from '../../../../services/app/hooks';
import { Icon } from '../../ui/Icon';
import './ToTopButton.scss';

export const ToTopButton: React.FC = () => {
  const location = useLocation();
  const { isDarkMode } = useAppSelector(state => state.theme);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Link
      to={`${location.pathname}`}
      className={classNames('footer__button-top', 'button-top', {
        'button-top--dark': isDarkMode,
      })}
      type="button"
      data-testid="to-top-button"
      onClick={handleScrollToTop}
    >
      <p className="button-top__text">
        Back to top
      </p>

      <Icon
        type={isDarkMode
          ? IconType.ARROW_UP_DARK
          : IconType.ARROW_UP}
        addClassName={classNames('button-top__icon', {
          'button-top__icon--dark': isDarkMode,
        })}
      />
    </Link>
  );
};
