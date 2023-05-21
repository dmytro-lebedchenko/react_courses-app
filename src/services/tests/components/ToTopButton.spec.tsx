import {
  render,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../app/store';
import { ToTopButton } from '../../../views/components/widgets/ToTopButton';

describe('"ToTopButton" component', () => {
  let wrapper: RenderResult;
  let toTopButton: HTMLElement;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <MemoryRouter>
          <ToTopButton />
        </MemoryRouter>
      </Provider>,
    );

    toTopButton = wrapper.getByTestId('to-top-button');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the component correctly', () => {
    expect(toTopButton).toBeInTheDocument();
    expect(toTopButton).toHaveAttribute('href', '/');
  });

  it('should scroll to the top when clicked', () => {
    window.scrollTo = jest.fn();

    fireEvent.click(toTopButton);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
});
