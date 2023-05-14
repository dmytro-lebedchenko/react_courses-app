import { render, screen } from '@testing-library/react';

import { RatingStars } from '../../../views/components/widgets/RatingStars';

describe('"RatingStars" component', () => {
  it('should have "rating-stars" class', () => {
    render(<RatingStars rating={3} />);

    const stars = screen.getAllByTestId('rating-stars');

    stars.forEach((star) => {
      expect(star).toHaveClass('rating__stars');
    });
  });

  it('should render full stars correctly', () => {
    render(<RatingStars rating={4} />);

    const fullStars = screen.getAllByTestId('icon__star-filled');

    expect(fullStars.length).toBe(4);
  });

  it('should render empty stars correctly', () => {
    render(<RatingStars rating={2} />);

    const emptyStars = screen.getAllByTestId('icon__star-empty');

    expect(emptyStars.length).toBe(3);
  });

  it('should render half-filled star correctly', () => {
    render(<RatingStars rating={3.5} />);

    const halfFilledStar = screen.getByTestId('icon__star-half-filled');

    expect(halfFilledStar).toBeInTheDocument();
  });
});
