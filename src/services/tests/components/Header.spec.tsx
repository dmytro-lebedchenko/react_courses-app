import { RenderResult, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from '../../../views/components/common/Header';

describe('"Header" component', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    const header = wrapper.container.querySelector('.header');

    expect(header).toBeInTheDocument();
  });

  it('should render "Logo"', () => {
    const logo = wrapper.getByAltText('logo');

    expect(logo).toBeInTheDocument();
  });
});
