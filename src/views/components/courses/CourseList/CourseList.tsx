import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../../../services/app/hooks';
import { ITEMS_ON_PAGE } from '../../../../services/app/consts';
import { Courses } from '../../../../data/types/models';
import { CourseCard } from '../CourseCard';
import { Pagination } from '../../widgets/Pagination';
import './CourseList.scss';

export const CourseList: React.FC = () => {
  const { courses } = useAppSelector(state => state.courses);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const [leftLimit, setLeftLimit] = useState(0);
  const [rightLimit, setRightLimit] = useState(courses.length);

  const visibleCourses = useMemo((): Courses[] => {
    return courses.slice(leftLimit, rightLimit);
  }, [courses, leftLimit, rightLimit]);

  useEffect(() => {
    const maxRightLimit = ITEMS_ON_PAGE * +currentPage;

    if (maxRightLimit > courses.length) {
      setRightLimit(courses.length);
    } else {
      setRightLimit(maxRightLimit);
    }

    setLeftLimit(ITEMS_ON_PAGE * (+currentPage - 1));
  }, [currentPage, courses]);

  return (
    <>
      <div className="course-list" data-testid="course-list">
        {visibleCourses.map(item => (
          <CourseCard
            key={item.id}
            course={item}
          />
        ))}
      </div>

      <Pagination length={courses.length} />
    </>
  );
};
