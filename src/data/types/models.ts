export type ButtonType = 'prev' | 'next';

export type LogoType = 'big' | 'big-dark' | 'small';

export interface Courses {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: {
    slug?: string;
    skills?: string[];
    difficulty?: string;
    courseVideoPreview?: {
      link?: string;
      duration?: number;
      previewImageLink?: string;
    }
  };
}

export interface LessonType {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: string;
  link: string | URL;
  previewImageLink: string;
  meta: string | null;
}

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
