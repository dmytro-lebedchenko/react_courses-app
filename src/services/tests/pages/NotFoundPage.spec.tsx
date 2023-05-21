import {
  screen,
  render,
  RenderResult,
} from '@testing-library/react';

import { NotFoundPage } from '../../../views/pages/NotFoundPage';

describe('"NotFoundPage" page', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<NotFoundPage />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the message', () => {
    const text = screen.getByText('Oh, no! Page is not found...');

    expect(text).toBeInTheDocument();
  });

  it('should render an image', () => {
    const image = screen.getByTestId('not-found-image');

    expect(image).toBeInTheDocument();
  });
});
