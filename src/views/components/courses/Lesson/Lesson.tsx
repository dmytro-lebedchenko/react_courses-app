import classNames from 'classnames';
import Hls from 'hls.js';
import { debounce } from 'lodash';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { VIDEO_OPTIONS } from '../../../../services/app/consts';
import { useAppSelector, useLocalStorage } from '../../../../services/app/hooks';
import { LessonType } from '../../../../data/types/models';
import { IconType } from '../../../../data/types/enums';
import { getSearchWith } from '../../../../services/utils/searchHelper';
import { Icon } from '../../ui/Icon';
import './Lesson.scss';

export const Lesson: React.FC = () => {
  const { selectedCourse } = useAppSelector(state => state.selectedCourse);
  const { isDarkMode } = useAppSelector(state => state.theme);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const lessonVideo = searchParams.get('lesson') || '';

  const initLesson: LessonType | null = useMemo(() => {
    if (!lessonVideo) {
      return selectedCourse?.lessons.find(
        lesson => lesson.status !== 'locked',
      ) || null;
    }

    return selectedCourse?.lessons.find(
      lesson => lesson.id === lessonVideo,
    ) || null;
  }, [lessonVideo, selectedCourse?.lessons]);

  const [lesson, setLesson] = useState<LessonType | null>(initLesson);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTime = +JSON.parse(
    localStorage.getItem(`video-progress-${lesson?.id}`) || '0',
  );

  const [setCurrentTime] = useLocalStorage<number>(
    `video-progress-${lesson?.id}`,
    currentTime,
  );

  const navigateToLessonId = (id: string) => {
    const newParams = getSearchWith(
      searchParams, {
        lesson: `${id}`,
      },
    );

    navigate({ search: newParams });
  };

  const handleDebounceTime = debounce((time: number) => {
    setCurrentTime(time);
  }, 1000);

  const handleClick = (currentLesson: LessonType) => {
    const video = videoRef.current;

    setLesson(currentLesson);
    navigateToLessonId(currentLesson.id);

    if (currentLesson.id === lesson?.id && video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  const handleOnKeyDown = (
    event: React.KeyboardEvent,
    currentLesson?: LessonType,
  ) => {
    const video = videoRef.current;

    if (video) {
      if (event.key === 'ArrowUp' && event.shiftKey) {
        video.playbackRate += VIDEO_OPTIONS.speedUpRate;
      }

      if (event.key === 'ArrowDown' && event.shiftKey) {
        video.playbackRate -= VIDEO_OPTIONS.slowDownRate;
      }
    }

    if (currentLesson && event.key === 'Enter') {
      handleClick(currentLesson);
    }
  };

  useEffect(() => {
    let playListener: () => void;
    let pauseListener: () => void;
    let timeUpdateListener: () => void;

    const handlePlayVideo = async () => {
      if (!videoRef.current) {
        return;
      }

      const video = videoRef.current;
      const url = `${lesson?.link}`;
      const lessonId = `${lesson?.id}`;

      const hls = new Hls({ enableWorker: false });

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(url);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.currentTime = currentTime;

          navigateToLessonId(lessonId);

          video.play();
          setIsPlaying(true);
        });
      });

      playListener = () => {
        setIsPlaying(true);
      };

      pauseListener = () => {
        setIsPlaying(false);
        handleDebounceTime(video.currentTime);
      };

      timeUpdateListener = () => {
        handleDebounceTime(video.currentTime);
      };

      video.addEventListener('play', playListener);
      video.addEventListener('pause', pauseListener);
      video.addEventListener('timeupdate', timeUpdateListener);

      if (Hls.isSupported()) {
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      }
    };

    handlePlayVideo();

    const currentVideo = videoRef.current;

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener('play', playListener);
        currentVideo.removeEventListener('pause', pauseListener);
        currentVideo.removeEventListener('timeupdate', timeUpdateListener);
      }
    };
  }, [lesson]);

  return (
    <div className="course__lesson lesson" data-testid="lesson">
      <div className="lesson__player player">
        <h2 className="player__title">
          {lesson?.title}
        </h2>

        <video
          className="player__video"
          data-testid="lesson-video"
          poster={`${lesson?.previewImageLink}/lesson-${lesson?.order}.webp`}
          ref={videoRef}
          controls
          onKeyDown={handleOnKeyDown}
        >
          <track
            kind="captions"
          />
        </video>

        <div className="player__description">
          <b>Shift + &uarr; </b>
          : speed up the video;

          <br />

          <b>Shift + &darr; </b>
          : slow down the video;
        </div>
      </div>

      <div className="lesson__playlist playlist">
        <div className="playlist__list">
          {selectedCourse?.lessons.map(item => (
            <button
              type="button"
              key={item.id}
              className={classNames(
                'playlist__item', {
                'playlist__item--dark': isDarkMode,
                'playlist__item--active':
                  lesson?.id === item.id && item.status !== 'locked',
                'playlist__item--active-dark':
                  isDarkMode && lesson?.id === item.id && item.status !== 'locked',
                'playlist__item--disabled': item.status === 'locked',
              })}
              onKeyDown={(event) => handleOnKeyDown(event, item)}
              onClick={() => handleClick(item)}
              disabled={item.status === 'locked'}
            >
              {item.status === 'unlocked'
                && (
                  <Icon
                    type={(isPlaying && lesson?.id === item.id)
                      ? IconType.PAUSE
                      : IconType.PLAY}
                    addClassName="playlist__item-icon"
                  />
                )}

              {lesson !== item
                && item.status === 'locked'
                && (
                  <Icon
                    type={IconType.BLOCKED}
                    addClassName="playlist__item-icon"
                  />
                )}

              <p
                className={classNames(
                  'playlist__item-title', {
                  'playlist__item-title--dark': isDarkMode,
                })}
              >
                {item.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
