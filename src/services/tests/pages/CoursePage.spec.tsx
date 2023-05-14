import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CoursePage } from '../../../views/pages/CoursePage';

describe('"CoursePage" page', () => {
  const mockStore = configureStore([]);

  it('should render "ErrorNotification" if hasError is true', () => {
    const store = mockStore({
      selectedCourse: {
        selectedCourse: [],
        hasError: true,
        loaded: true,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <CoursePage />
      </Provider>,
    );

    const error = getByTestId('error-notification');

    expect(error).toBeInTheDocument();
  });

  it('should render "Loader" if loaded is false', () => {
    const store = mockStore({
      selectedCourse: {
        selectedCourse: [],
        hasError: false,
        loaded: false,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <CoursePage />
      </Provider>,
    );

    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });
});
