import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Logo } from '../../../views/components/ui/Logo';

describe('"Logo" component', () => {
  it('should render correctly with big logo', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Logo type="big" />
      </MemoryRouter>,
    );

    const logoBig = getByAltText('logo');

    expect(logoBig).toBeInTheDocument();
  });

  it('should render correctly with small logo', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Logo type="small" />
      </MemoryRouter>,
    );

    const logoSmall = getByAltText('logo');

    expect(logoSmall).toBeInTheDocument();
  });
});
