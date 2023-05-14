import { DarkModeSwitch } from 'react-toggle-dark-mode';

import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
} from '../../../../services/app/hooks';
import { setTheme } from '../../../../services/features/themeSlice';
import './ThemeToggler.scss';

export const ThemeToggler: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector(state => state.theme);

  const [setStorageTheme] = useLocalStorage<boolean>(
    'isDarkMode', isDarkMode,
  );

  const handleChange = () => {
    dispatch(setTheme(!isDarkMode));
    setStorageTheme(!isDarkMode);
  };

  return (
    <div className='theme-toggler'>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={handleChange}
        size={24}
      />
    </div>
  );
}
