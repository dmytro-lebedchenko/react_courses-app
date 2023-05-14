import {
  render,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BackButton } from '../../../views/components/widgets/BackButton';

describe('"BackButton" component', () => {
  let wrapper: RenderResult;
  let backButton: HTMLElement;

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>,
    );

    backButton = wrapper.getByTestId('back-button');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(backButton).toBeInTheDocument();
  });

  it('should have type "button"', () => {
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('type', 'button');
  });

  it('should have class "back-button"', () => {
    expect(backButton).toHaveClass('back-button');
  });

  it('should have a link to the home page', () => {
    expect(backButton.tagName).toBe('A');
    expect(backButton.getAttribute('href')).toBe('/');
  });

  it('should return user to the home page on click', () => {
    fireEvent.click(backButton);

    expect(window.location.pathname).toBe('/');
  });
});
