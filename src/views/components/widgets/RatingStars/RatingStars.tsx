import { IconType } from '../../../../data/types/enums';
import { useAppSelector } from '../../../../services/app/hooks';
import { Icon } from '../../ui/Icon';
import './RatingStars.scss';

type Props = {
  rating: number
};

export const RatingStars: React.FC<Props> = ({ rating }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  const fullStarsCount = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const emptyStarsCount = hasHalfStar
    ? 4 - fullStarsCount
    : 5 - fullStarsCount;

  const getFilledArray = (length: number) => {
    return Array.from({ length }, (_, i) => i);
  };

  const fullStarsBase = getFilledArray(fullStarsCount);
  const emptyStarsBase = getFilledArray(emptyStarsCount);

  return (
    <div
      className="rating__stars stars"
      data-testid="rating-stars"
    >
      {fullStarsBase.map((item) => (
        <Icon
          key={item}
          type={isDarkMode
            ? IconType.STAR_FILLED_DARK
            : IconType.STAR_FILLED}
          addClassName="stars__star"
        />
      ))}

      {hasHalfStar
        && (
          <Icon
            type={isDarkMode
              ? IconType.STAR_HALF_FILLED_DARK
              : IconType.STAR_HALF_FILLED}
            addClassName="stars__star"
          />
        )}

      {emptyStarsBase.map((item) => (
        <Icon
          key={item}
          type={isDarkMode
            ? IconType.STAR_EMPTY_DARK
            : IconType.STAR_EMPTY}
          addClassName="stars__star"
        />
      ))}
    </div>
  );
};
