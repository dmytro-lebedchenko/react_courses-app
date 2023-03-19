import { configureStore } from '@reduxjs/toolkit';

import coursesSlice from '../features/coursesSlice';
import selectedCourseSlice from '../features/selectedCourseSlice';

export const store = configureStore({
  reducer: {
    courses: coursesSlice,
    selectedCourse: selectedCourseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
