import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../../../services/app/store';
import { CourseCard } from '../../../views/components/courses/CourseCard';
import { testCourse } from '../testData';

describe('"CourseCard" component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseCard course={testCourse} />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('should render course title', () => {
    const courseTitle = screen.getByRole('heading', { level: 3 });

    expect(courseTitle).toHaveTextContent('Course 1');
  });

  it('should render course tags', () => {
    const courseTags = screen.getByText(/tag1/);

    expect(courseTags).toBeInTheDocument();
  });

  it('should render rating stars', () => {
    const ratingStars = screen.getByTestId('rating-stars');

    expect(ratingStars).toBeInTheDocument();
  });
});
