import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../app/store';
import { Logo } from '../../../views/components/ui/Logo';

describe('"Logo" component', () => {
  it('should render correctly with big logo', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Logo type="big" />
        </MemoryRouter>
      </Provider>,
    );

    const logoBig = getByAltText('logo');

    expect(logoBig).toBeInTheDocument();
  });

  it('should render correctly with small logo', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Logo type="small" />
        </MemoryRouter>
      </Provider>,
    );

    const logoSmall = getByAltText('logo');

    expect(logoSmall).toBeInTheDocument();
  });
});
