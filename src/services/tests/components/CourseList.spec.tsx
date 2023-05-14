import { Store } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { CourseList } from '../../../views/components/courses/CourseList';
import { testCourses } from '../testData';

const mockStore = configureStore([thunk]);

describe('"CourseList" component', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      courses: {
        courses: testCourses,
      },
    });
  });

  it('should render a list of courses', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseList />
        </MemoryRouter>
      </Provider>,
    );

    const courseTitles = screen.getAllByRole('heading', { level: 3 });

    expect(courseTitles).toHaveLength(2);
    expect(courseTitles[0]).toHaveTextContent('Course 1');
    expect(courseTitles[1]).toHaveTextContent('Course 2');
  });
});
