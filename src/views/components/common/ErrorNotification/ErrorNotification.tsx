import classNames from 'classnames';

import { ErrorType } from '../../../../data/types/enums';
import { useAppSelector } from '../../../../services/app/hooks';
import './ErrorNotification.scss';

type Props = {
  error: ErrorType,
};

export const ErrorNotification: React.FC<Props> = ({ error }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <h1
      className={classNames('error-notification', {
        'error-notification--dark': isDarkMode,
      })}
      data-testid="error-notification"
    >
      {`...${error}...`}
    </h1>
  );
};
