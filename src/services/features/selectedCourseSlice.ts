import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { CourseDetails } from '../../data/types/models';
import { getCourseDetails } from '../../data/api/getCourses';

type State = {
  selectedCourse: CourseDetails | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  selectedCourse: null,
  loaded: false,
  hasError: false,
};

export const selectedCourseInit = createAsyncThunk(
  'selectedCourse/fetch', async (courseId: string) => {
    if (!courseId) {
      return null;
    }

    return getCourseDetails(courseId);
  },
);

const selectedCourseSlice = createSlice({
  name: 'selectedCourse',
  initialState,
  reducers: {
    setSelectedCourse: (state, action: PayloadAction<CourseDetails>) => ({
      ...state,
      selectedCourse: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(selectedCourseInit.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(selectedCourseInit.fulfilled, (state, action) => ({
      ...state,
      selectedCourse: action.payload ?? null,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(selectedCourseInit.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default selectedCourseSlice.reducer;
export const { setSelectedCourse } = selectedCourseSlice.actions;
