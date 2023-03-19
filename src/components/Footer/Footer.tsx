import { Link } from 'react-router-dom';

import { useWindowSize } from '../../app/hooks';
import { Logo } from '../Logo';
import { ToTopButton } from '../ToTopButton';
import './Footer.scss';

export const Footer: React.FC = () => {
  const { width } = useWindowSize();

  return (
    <footer className="footer">
      <div className="footer__container">
        {width > 640 ? (
          <Logo type="big" />
        ) : (
          <Logo type="small" />
        )}

        <Link
          to="https://github.com/dmytro-lebedchenko"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </Link>

        <ToTopButton />
      </div>
    </footer>
  );
};
