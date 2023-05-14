import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../services/app/hooks';
import { ErrorNotification } from '../../components/common/ErrorNotification';
import { Loader } from '../../components/ui/Loader';
import { Course } from '../../components/courses/Course';
import { selectedCourseInit } from '../../../services/features/selectedCourseSlice';
import { ErrorType } from '../../../data/types/enums';

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
