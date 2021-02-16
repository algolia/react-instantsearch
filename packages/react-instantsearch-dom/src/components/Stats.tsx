import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';

const cx = createClassNames('Stats');

export type StatsTranslationKeyProps = {
  isSmartSorted?: boolean;
  n: number;
  nSorted?: number;
  ms: number;
};

export type StatsComponent = {
  className?: string;
  isSmartSorted: boolean;
  nbHits: number;
  nbSortedHits?: number;
  processingTimeMS: number;
  translate(key: string, props: StatsTranslationKeyProps): string;
};

const Stats: React.FC<StatsComponent> = ({
  className = '',
  isSmartSorted,
  nbHits,
  nbSortedHits,
  processingTimeMS,
  translate,
}) => {
  return (
    <div className={classNames(cx(''), className)}>
      <span className={cx('text')}>
        {translate('stats', {
          n: nbHits,
          nSorted: nbSortedHits,
          isSmartSorted,
          ms: processingTimeMS,
        })}
      </span>
    </div>
  );
};

Stats.propTypes = {
  className: PropTypes.string,
  isSmartSorted: PropTypes.bool.isRequired,
  nbHits: PropTypes.number.isRequired,
  nbSortedHits: PropTypes.number,
  processingTimeMS: PropTypes.number.isRequired,
  translate: PropTypes.func.isRequired,
};

export default translatable({
  stats: ({
    n,
    nSorted,
    isSmartSorted = false,
    ms,
  }: StatsTranslationKeyProps): string =>
    isSmartSorted && nSorted !== undefined && n !== nSorted
      ? `${nSorted.toLocaleString()} relevant results sorted out of ${n.toLocaleString()} in ${ms.toLocaleString()}ms`
      : `${n.toLocaleString()} results found in ${ms.toLocaleString()}ms`,
})(Stats);
