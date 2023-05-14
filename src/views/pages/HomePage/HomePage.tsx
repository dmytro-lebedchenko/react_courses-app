import { ErrorType } from "../../../data/types/enums";
import { useAppSelector } from "../../../services/app/hooks";
import { ErrorNotification } from "../../components/common/ErrorNotification";
import { CourseList } from "../../components/courses/CourseList";
import { Loader } from "../../components/ui/Loader";

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
