import { LessonType } from './LessonType';

export interface CourseDetails {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills: string[];
    courseVideoPreview: {
      link: string | URL;
      duration: number;
      previewImageLink: string;
    };
  };
  lessons: LessonType[];
  containsLockedLessons: boolean;
}
