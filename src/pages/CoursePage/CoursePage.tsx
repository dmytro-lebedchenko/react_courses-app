import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Course } from '../../components/Course';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { selectedCourseInit } from '../../features/selectedCourseSlice';
import { ErrorType } from '../../types/ErrorType';

export const CoursePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    selectedCourse,
    hasError,
    loaded,
  } = useAppSelector(state => state.selectedCourse);

  const { courseId = '' } = useParams();

  useEffect(() => {
    if (!selectedCourse) {
      dispatch(selectedCourseInit(courseId));
    }
  }, [courseId, selectedCourse, dispatch]);

  return (
    <>
      {hasError && (
        <ErrorNotification
          error={ErrorType.GET_COURSE_DETAILS}
        />
      )}

      {!loaded && <Loader />}

      {selectedCourse
        && !hasError
        && loaded
        && (
          <Course />
        )}
    </>
  );
};
