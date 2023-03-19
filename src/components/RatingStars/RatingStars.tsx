import { IconType } from '../../types/IconType';
import { Icon } from '../Icon';
import './RatingStars.scss';

type Props = {
  rating: number
};

export const RatingStars: React.FC<Props> = ({ rating }) => {
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
    <div className="rating__stars stars">
      {fullStarsBase.map((item) => (
        <Icon
          key={item}
          type={IconType.STAR_FILLED}
          addClassName="stars__star"
        />
      ))}

      {hasHalfStar
        && (
          <Icon
            type={IconType.STAR_HALF_FILLED}
            addClassName="stars__star"
          />
        )}

      {emptyStarsBase.map((item) => (
        <Icon
          key={item}
          type={IconType.STAR_EMPTY}
          addClassName="stars__star"
        />
      ))}
    </div>
  );
};
