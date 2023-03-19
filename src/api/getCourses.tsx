import { CourseDetails } from '../types/CourseDetails';
import { Courses } from '../types/Courses';
import { client } from '../utils/fetchClient';

export const getCourses = async () => {
  const { courses } = await client.get<{ courses: Courses[] }>('');

  return courses;
};

export const getCourseDetails = (courseId: string) => {
  return client.get<CourseDetails>(`/${courseId}`);
};
