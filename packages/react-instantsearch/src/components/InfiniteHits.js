import PropTypes from 'prop-types';
import React, { Component } from 'react';
import translatable from '../core/translatable';
import createClassNames from './createClassNames';

const cx = createClassNames('InfiniteHits');

class InfiniteHits extends Component {
  render() {
    const {
      hitComponent: HitComponent,
      hits,
      hasMore,
      refine,
      translate,
    } = this.props;

    return (
      <div className={cx('')}>
        <ul className={cx('list')}>
          {hits.map(hit => (
            <li key={hit.objectID} className={cx('item')}>
              <HitComponent hit={hit} />
            </li>
          ))}
        </ul>
        <button
          className={cx('loadMore', !hasMore && 'loadMore--disabled')}
          onClick={() => refine()}
          disabled={!hasMore}
        >
          {translate('loadMore')}
        </button>
      </div>
    );
  }
}

InfiniteHits.propTypes = {
  hits: PropTypes.array,
  hitComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
};

InfiniteHits.defaultProps = {
  hitComponent: hit => (
    <div
      style={{
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
        wordBreak: 'break-all',
      }}
    >
      {JSON.stringify(hit).slice(0, 100)}...
    </div>
  ),
};

export default translatable({
  loadMore: 'Load more',
})(InfiniteHits);
