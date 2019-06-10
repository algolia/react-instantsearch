import React from 'react';
import { connectRange } from 'react-instantsearch-dom';
import cx from 'classnames';

const Ratings = ({ currentRefinement, refine, createURL, count }) => {
  const ratings = new Array(4).fill(null);
  const stars = new Array(5).fill(null);

  return (
    <div className="ais-RatingMenu">
      <ul className="ais-RatingMenu-list">
        {ratings.map((_, ratingIndex) => {
          const ratingValue = 4 - ratingIndex;

          const itemsCount = count
            .filter(countObj => ratingValue <= parseInt(countObj.value, 10))
            .map(countObj => countObj.count)
            .reduce((sum, currentCount) => sum + currentCount, 0);

          return (
            <li
              className={cx('ais-RatingMenu-item', {
                'ais-RatingMenu-item--selected':
                  ratingValue === currentRefinement.min,
                'ais-RatingMenu-item--disabled': itemsCount === 0,
              })}
              key={ratingValue}
            >
              <a
                className="ais-RatingMenu-link"
                aria-label={`${ratingValue} & up`}
                href={createURL(ratingValue)}
                onClick={event => {
                  event.preventDefault();

                  if (currentRefinement.min === ratingValue) {
                    refine({ min: 0 });
                  } else {
                    refine({ min: ratingValue });
                  }
                }}
              >
                {stars.map((__, index) => {
                  const starIndex = index + 1;
                  const isStarFull = starIndex < 5 - ratingIndex;

                  return (
                    <svg
                      key={index}
                      className={cx('ais-RatingMenu-starIcon', {
                        'ais-RatingMenu-starIcon--full': isStarFull,
                        'ais-RatingMenu-starIcon--empty': !isStarFull,
                      })}
                      aria-hidden="true"
                      width="16"
                      height="16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
                      />
                    </svg>
                  );
                })}

                <span className="ais-RatingMenu-count">{itemsCount}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connectRange(Ratings);
