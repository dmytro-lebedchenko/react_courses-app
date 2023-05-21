import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { HomePage } from '../../../views/pages/HomePage';
import { testCourses } from '../testData';

describe('"HomePage" page', () => {
  const mockStore = configureStore([]);

  it('should render "ErrorNotification" if hasError is true', () => {
    const store = mockStore({
      courses: {
        courses: [],
        hasError: true,
        loaded: true,
      },
      theme: {
        isDarkMode: false,
      }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );

    const error = getByTestId('error-notification');

    expect(error).toBeInTheDocument();
  });

  it('should render "Loader" if loaded is false', () => {
    const store = mockStore({
      courses: {
        courses: [],
        hasError: false,
        loaded: false,
      },
      theme: {
        isDarkMode: false,
      }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );

    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  it('should render correctly', () => {
    const store = mockStore({
      courses: {
        courses: testCourses,
        hasError: false,
        loaded: true,
      },
      theme: {
        isDarkMode: false,
      }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>,
    );

    const courseList = getByTestId('course-list');

    expect(courseList).toBeInTheDocument();
  });
});
