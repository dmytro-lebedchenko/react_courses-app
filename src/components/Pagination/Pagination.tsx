import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { ButtonType } from '../../types/ButtonType';
import { IconType } from '../../types/IconType';
import { getSearchWith } from '../../utils/searchHelper';
import { Icon } from '../Icon';
import './Pagination.scss';

type Props = {
  length: number,
};

export const Pagination: React.FC<Props> = ({ length }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [totalPages, setTotalPages] = useState(0);

  const page = searchParams.get('page') || '1';
  const perPage = 10;

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
      if (!perPage) {
        return 0;
      }

      return Math.ceil(length / perPage);
    };

    const pages = getTotalPages();

    setTotalPages(pages);
  }, [length]);

  return (
    <div className="category-page__pagination">
      <ul className="pagination">
        <button
          type="button"
          className="pagination__button"
          data-cy="paginationLeft"
          disabled={disabledLeftButton}
          onClick={() => handleArrowClick('prev')}
        >
          {!disabledLeftButton && (
            <Icon
              type={IconType.ARROW_LEFT}
            />
          )}

          {disabledLeftButton && (
            <Icon
              type={IconType.ARROW_LEFT_DISABLED}
            />
          )}
        </button>

        <div className="pagination__list">
          {paginationList.map(pageNumber => (
            <button
              key={pageNumber}
              type="button"
              className={
                classNames('pagination__item', {
                  'pagination__item--is-active': +page === pageNumber,
                })
              }
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="pagination__button"
          data-cy="paginationRight"
          disabled={disabledRightButton}
          onClick={() => handleArrowClick('next')}
        >
          {!disabledRightButton && (
            <Icon
              type={IconType.ARROW_RIGHT}
            />
          )}

          {disabledRightButton && (
            <Icon
              type={IconType.ARROW_RIGHT_DISABLED}
            />
          )}
        </button>
      </ul>
    </div>
  );
};
