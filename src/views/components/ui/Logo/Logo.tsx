import { Link } from 'react-router-dom';

import { LogoType } from '../../../../data/types/models';
import { ROUTE_PATH } from '../../../../services/app/consts';

type Props = {
  type: LogoType;
};

export const Logo: React.FC<Props> = ({ type }) => {
  const logoPath = () => {
    switch (type) {
      case 'big':
        return ROUTE_PATH.logo.big;

      case 'big-dark':
        return ROUTE_PATH.logo.bigDark;

      default:
      case 'small':
        return ROUTE_PATH.logo.small;
    }
  };

  return (
    <Link to="/">
      <img
        src={logoPath()}
        alt="logo"
      />
    </Link>
  );
};
