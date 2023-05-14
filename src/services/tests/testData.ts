import {
  CourseDetails,
  Courses,
  LessonType,
} from "../../data/types/models";

export const testCourses: Courses[] = [
  {
    id: '1',
    title: 'Course 1',
    tags: ['tag1', 'tag2'],
    launchDate: '2021-05-01',
    status: 'published',
    description: 'Description of course 1',
    duration: 60,
    lessonsCount: 10,
    containsLockedLessons: false,
    previewImageLink: 'https://example.com/course1.jpg',
    rating: 4.5,
    meta: {
      slug: 'course-1',
      skills: ['skill1', 'skill2'],
      difficulty: 'beginner',
      courseVideoPreview: {
        link: 'https://example.com/course1-preview.mp4',
        duration: 30,
        previewImageLink: 'https://example.com/course1-preview.jpg',
      },
    },
  },
  {
    id: '2',
    title: 'Course 2',
    tags: ['tag3', 'tag4'],
    launchDate: '2021-05-02',
    status: 'published',
    description: 'Description of course 2',
    duration: 90,
    lessonsCount: 15,
    containsLockedLessons: true,
    previewImageLink: 'https://example.com/course2.jpg',
    rating: 3.8,
    meta: {
      slug: 'course-2',
      skills: ['skill3', 'skill4'],
      difficulty: 'intermediate',
      courseVideoPreview: {
        link: 'https://example.com/course2-preview.mp4',
        duration: 45,
        previewImageLink: 'https://example.com/course2-preview.jpg',
      },
    },
  },
];

export const testCourse: Courses = testCourses[0];

export const testLessons: LessonType[] = [
  {
    id: 'lesson1',
    title: 'Lesson 1',
    duration: 60,
    order: 1,
    type: 'video',
    status: 'completed',
    link: 'https://example.com/lesson1',
    previewImageLink: 'https://example.com/lesson1-preview.jpg',
    meta: null,
  },
  {
    id: 'lesson2',
    title: 'Lesson 2',
    duration: 45,
    order: 2,
    type: 'article',
    status: 'incomplete',
    link: 'https://example.com/lesson2',
    previewImageLink: 'https://example.com/lesson2-preview.jpg',
    meta: null,
  },
];

export const testLesson: LessonType = testLessons[0];

export const testCourseDetails: CourseDetails = {
  id: 'cf21a172-5a09-460c-a02f-51bfc2314e79',
  title: 'Memory training simulator',
  tags: ['learning ability'],
  launchDate: '2023-01-11T11:19:46.000Z',
  status: 'launched',
  description: 'Work out your memory to remember anything.',
  duration: 1140,
  previewImageLink: 'https://wisey.app/assets/memory-bootcamp',
  rating: 4.3,
  meta: {
    slug: 'memory-bootcamp',
    skills: ['Self-assertion'],
    courseVideoPreview: {
      link: 'https://wisey.app/videos/preview.m3u8',
      duration: 123,
      previewImageLink: 'https://wisey.app/assets/images/preview',
    },
  },
  lessons: testLessons,
  containsLockedLessons: false,
};
