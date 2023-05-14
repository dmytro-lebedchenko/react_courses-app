import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { useAppSelector } from '../../../../services/app/hooks';
import { ITEMS_ON_PAGE } from '../../../../services/app/consts';
import { ButtonType } from '../../../../data/types/models';
import { IconType } from '../../../../data/types/enums';
import { getSearchWith } from '../../../../services/utils/searchHelper';
import { Icon } from '../../ui/Icon';
import './Pagination.scss';

type Props = {
  length: number,
};

export const Pagination: React.FC<Props> = ({ length }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isDarkMode } = useAppSelector(state => state.theme);

  const [totalPages, setTotalPages] = useState(0);

  const page = searchParams.get('page') || '1';

  const paginationList = (totalPages > 1)
    ? (Array.from(
      { length: totalPages },
      (_, i) => i + 1,
    ))
    : [1];

  const disabledLeftButton = (page === '1');

  const disabledRightButton = (page === '1')
    ? (page === `${totalPages + 1}`)
    : (page === `${totalPages}`);

  const leftButtonCondition = () => {
    switch (true) {
      case disabledLeftButton:
        return IconType.ARROW_LEFT_DISABLED;

      case !disabledLeftButton && isDarkMode:
        return IconType.ARROW_LEFT_DARK;
  
      default:
      case !disabledLeftButton && !isDarkMode:
        return IconType.ARROW_LEFT;
    }
  };

  const rightButtonCondition = () => {
    switch (true) {
      case disabledRightButton:
        return IconType.ARROW_RIGHT_DISABLED;

      case !disabledRightButton && isDarkMode:
        return IconType.ARROW_RIGHT_DARK;
  
      default:
      case !disabledRightButton && !isDarkMode:
        return IconType.ARROW_RIGHT;
    }
  };

  const handlePageClick = (pageItem: number) => {
    if (page === `${pageItem}`) {
      return;
    }

    const newParams = getSearchWith(
      searchParams, {
        page: `${pageItem}`,
      },
    );

    navigate({ search: newParams });
  };

  const handleArrowClick = (type: ButtonType) => {
    const currentPage = page
      ? +page
      : null;

    if (type === 'prev' && currentPage) {
      if (currentPage === 1) {
        return;
      }

      const newParams = getSearchWith(
        searchParams, {
          page: `${currentPage - 1}`,
        },
      );

      navigate({ search: newParams });
    }

    if (type === 'next' && currentPage) {
      if (currentPage === totalPages) {
        return;
      }

      const newParams = getSearchWith(
        searchParams, {
          page: `${currentPage + 1}`,
        },
      );

      navigate({ search: newParams });
    }
  };

  useEffect(() => {
    const getTotalPages = () => {
      if (!ITEMS_ON_PAGE) {
        return 0;
      }

      return Math.ceil(length / ITEMS_ON_PAGE);
    };

    const pages = getTotalPages();

    setTotalPages(pages);
  }, [length]);

  return (
    <div className="category-page__pagination">
      <ul className="pagination">
        <button
          type="button"
          className={classNames(
            'pagination__button', {
            'pagination__button--dark': isDarkMode,
          })}
          data-testid="pagination-left"
          disabled={disabledLeftButton}
          onClick={() => handleArrowClick('prev')}
        >
          <Icon type={leftButtonCondition()} />
        </button>

        <div className="pagination__list">
          {paginationList.map(pageNumber => (
            <button
              key={pageNumber}
              type="button"
              className={classNames(
                'pagination__item', {
                'pagination__item--dark': isDarkMode,
                'pagination__item--is-active': !isDarkMode && +page === pageNumber,
                'pagination__item--dark-is-active': isDarkMode && +page === pageNumber,
              })}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={classNames(
            'pagination__button', {
            'pagination__button--dark': isDarkMode,
          })}
          data-testid="pagination-right"
          disabled={disabledRightButton}
          onClick={() => handleArrowClick('next')}
        >
          <Icon type={rightButtonCondition()} />
        </button>
      </ul>
    </div>
  );
};
