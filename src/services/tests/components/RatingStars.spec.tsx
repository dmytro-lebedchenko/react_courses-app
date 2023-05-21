import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../app/store';
import { RatingStars } from '../../../views/components/widgets/RatingStars';

describe('"RatingStars" component', () => {
  it('should have "rating-stars" class', () => {
    render(
      <Provider store={store}>
        <RatingStars rating={3} />
      </Provider>
    );

    const stars = screen.getAllByTestId('rating-stars');

    stars.forEach((star) => {
      expect(star).toHaveClass('rating__stars');
    });
  });

  it('should render full stars correctly', () => {
    render(
      <Provider store={store}>
        <RatingStars rating={4} />
      </Provider>
    );

    const fullStars = screen.getAllByTestId('icon__star-filled');

    expect(fullStars.length).toBe(4);
  });

  it('should render empty stars correctly', () => {
    render(
      <Provider store={store}>
        <RatingStars rating={2} />
      </Provider>
    );

    const emptyStars = screen.getAllByTestId('icon__star-empty');

    expect(emptyStars.length).toBe(3);
  });

  it('should render half-filled star correctly', () => {
    render(
      <Provider store={store}>
        <RatingStars rating={3.5} />
      </Provider>
    );

    const halfFilledStar = screen.getByTestId('icon__star-half-filled');

    expect(halfFilledStar).toBeInTheDocument();
  });
});
