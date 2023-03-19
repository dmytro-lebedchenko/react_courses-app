import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { Courses } from '../../types/Courses';
import { CourseCard } from '../CourseCard';
import { Pagination } from '../Pagination';
import './CourseList.scss';

export const CourseList: React.FC = () => {
  const { courses } = useAppSelector(state => state.courses);

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';
  const perPage = 10;

  let leftLimit = 0;
  let rightLimit = courses.length;

  if (currentPage && perPage) {
    leftLimit = perPage * (+currentPage - 1);

    rightLimit = perPage * +currentPage > courses.length
      ? courses.length
      : perPage * +currentPage;
  } else {
    leftLimit = 0;
    rightLimit = courses.length;
  }

  const visibleCourses = useMemo((): Courses[] => {
    return courses.slice(leftLimit, rightLimit);
  }, [courses, leftLimit, rightLimit]);

  return (
    <>
      <div className="course-list">
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
