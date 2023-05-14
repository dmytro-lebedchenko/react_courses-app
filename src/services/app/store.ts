import { configureStore } from '@reduxjs/toolkit';
import coursesSlice from '../features/coursesSlice';
import selectedCourseSlice from '../features/selectedCourseSlice';
import themeSlice from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    courses: coursesSlice,
    selectedCourse: selectedCourseSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
