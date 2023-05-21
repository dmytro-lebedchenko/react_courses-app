import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { getCourses } from '../../data/api/getCourses';
import { Courses } from '../../data/types/models';

type State = {
  courses: Courses[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  courses: [],
  loaded: false,
  hasError: false,
};

export const coursesInit = createAsyncThunk(
  'courses/fetch', () => getCourses(),
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Courses[]>) => ({
      ...state,
      courses: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(coursesInit.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(coursesInit.fulfilled, (state, action) => ({
      ...state,
      courses: action.payload,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(coursesInit.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default coursesSlice.reducer;
export const { setCourses } = coursesSlice.actions;
