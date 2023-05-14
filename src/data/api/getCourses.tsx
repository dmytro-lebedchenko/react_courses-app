import { client } from '../../services/utils/fetchClient';
import { CourseDetails, Courses } from '../types/models';

export const getCourses = async () => {
  const { courses } = await client.get<{ courses: Courses[] }>('');

  return courses;
};

export const getCourseDetails = (courseId: string) => {
  return client.get<CourseDetails>(`/${courseId}`);
};
