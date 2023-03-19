import { useAppSelector } from '../../app/hooks';
import { CourseList } from '../../components/CourseList';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { ErrorType } from '../../types/ErrorType';

export const HomePage: React.FC = () => {
  const {
    courses,
    hasError,
    loaded,
  } = useAppSelector(state => state.courses);

  return (
    <>
      {hasError && (
        <ErrorNotification
          error={ErrorType.GET_COURSES}
        />
      )}

      {!loaded && <Loader />}

      {courses.length > 0
        && !hasError
        && loaded
        && (
          <CourseList />
        )}
    </>
  );
};
