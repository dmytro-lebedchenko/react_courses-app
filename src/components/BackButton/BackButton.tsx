import { Link } from 'react-router-dom';

import { IconType } from '../../types/IconType';
import { Icon } from '../Icon';
import './BackButton.scss';

export const BackButton: React.FC = () => (
  <Link
    to="/"
    className="back-button"
    type="button"
    data-cy="backButton"
  >
    <Icon
      type={IconType.ARROW_LEFT}
      addClassName="back-button__arrow"
    />

    Back
  </Link>
);
