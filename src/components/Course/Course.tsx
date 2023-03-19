import { useAppSelector } from '../../app/hooks';
import { BackButton } from '../BackButton';
import { Lesson } from '../Lesson';
import './Course.scss';

export const Course: React.FC = () => {
  const { selectedCourse } = useAppSelector(state => state.selectedCourse);

  return (
    <div className="course">
      <BackButton />

      <div className="course__title title">
        <h1 className="title__main">
          {selectedCourse?.title}
        </h1>

        <p className="title__description">
          {selectedCourse?.description}
        </p>
      </div>

      <Lesson />
    </div>
  );
};
