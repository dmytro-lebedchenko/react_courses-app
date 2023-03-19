import classNames from 'classnames';
import Hls from 'hls.js';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { selectedCourseInit } from '../../features/selectedCourseSlice';
import { Courses } from '../../types/Courses';
import { RatingStars } from '../RatingStars';
import './CourseCard.scss';

type Props = {
  course: Courses,
};

export const CourseCard: React.FC<Props> = ({ course }) => {
  const {
    id,
    tags,
    title,
    previewImageLink,
    lessonsCount,
    meta,
    rating,
  } = course;

  const [isHovered, setIsHovered] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(selectedCourseInit(id));
  };

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsHovered(false);
    }

    if (event.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    let hls: Hls;

    if (isHovered && videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }

      hls = new Hls({ enableWorker: false });

      if (meta.courseVideoPreview?.link) {
        hls.loadSource(meta.courseVideoPreview.link);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });
      } else {
        setIsHovered(false);
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [isHovered, meta.courseVideoPreview?.link]);

  return (
    <Link
      to={`../course/${id}`}
      className="course-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(event) => handleOnKeyDown(event)}
      onClick={handleClick}
    >
      <h5
        className={classNames(
          'course-card__category',
          { 'course-card__category--yellow': tags[0] === 'productivity' },
          { 'course-card__category--purple': tags[0] === 'learning ability' },
          { 'course-card__category--red': tags[0] === 'communication' },
          { 'course-card__category--green': tags[0] === 'psychology' },
        )}
      >
        {tags[0]}
      </h5>

      <div className="course-card__image">
        {isHovered && meta.courseVideoPreview?.link ? (
          <video
            className="course-card__video"
            src={meta.courseVideoPreview.link}
            ref={videoRef}
            muted
            loop
            poster={`${previewImageLink}/cover.webp`}
          />
        ) : (
          <img
            className="course-card__pic"
            src={`${previewImageLink}/cover.webp`}
            alt={title}
          />
        )}
      </div>

      <h3 className="course-card__title">
        {title}
      </h3>

      <div className="course-card__features">
        <span className="course-card__feature-item">
          Lessons count

          <span className="course-card__feature-info">
            {lessonsCount}
          </span>
        </span>

        <span className="course-card__feature-item">
          Rating

          <span className="course-card__feature-info--rating rating">
            <RatingStars rating={rating} />

            {rating}
          </span>
        </span>

        <span className="course-card__feature-item">
          Skills

          <ul className="course-card__feature-info">
            {!meta.skills?.length && (
              <span className="course-card__feature-info">
                N/A
              </span>
            )}

            {meta.skills?.map(skill => (
              <li
                key={skill}
                className="course-card__feature-info"
              >
                {skill}
              </li>
            ))}
          </ul>
        </span>
      </div>
    </Link>
  );
};
