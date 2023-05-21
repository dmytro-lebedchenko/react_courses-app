import {
  RenderResult,
  render,
  screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../app/store';
import { Footer } from '../../../views/components/common/Footer';

describe('"Footer" component', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    const { container } = wrapper;
    const footer = container.querySelector('.footer');

    expect(footer).toBeInTheDocument();
  });

  it('should contain "Logo" component', () => {
    const logo = wrapper.getByAltText('logo');

    expect(logo).toBeInTheDocument();
  });

  it('should contain "ToTopButton" component', () => {
    const toTopButton = screen.getByTestId('to-top-button');

    expect(toTopButton).toBeInTheDocument();
  });
});
