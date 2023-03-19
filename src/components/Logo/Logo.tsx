import { Link } from 'react-router-dom';

import { LogoType } from '../../types/LogoType';

type Props = {
  type: LogoType;
};

export const Logo: React.FC<Props> = ({ type }) => {
  const logoPath = (type === 'big')
    ? './images/icons/logo.svg'
    : './images/icons/logo-small.svg';

  return (
    <Link to="/">
      <img
        src={logoPath}
        alt="logo"
      />
    </Link>
  );
};
