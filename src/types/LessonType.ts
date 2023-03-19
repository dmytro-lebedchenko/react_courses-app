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
