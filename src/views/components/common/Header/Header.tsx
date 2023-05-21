import classNames from 'classnames';

import { useAppSelector } from '../../../../services/app/hooks';
import { Logo } from '../../ui/Logo';
import { ThemeToggler } from '../../widgets/ThemeToggler';
import './Header.scss';

export const Header: React.FC = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <header
      className={classNames('header', {
        'header--dark': isDarkMode,
      })}
    >
      <Logo type={isDarkMode ? 'big-dark' : 'big'} />

      <ThemeToggler />
    </header>
  );
};
