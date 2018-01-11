import PropTypes from 'prop-types';
import React, { Component } from 'react';
import translatable from '../core/translatable';
import createClassNames from './createClassNames';

const cx = createClassNames('Stats');

class Stats extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    nbHits: PropTypes.number.isRequired,
    processingTimeMS: PropTypes.number.isRequired,
  };

  render() {
    const { translate, nbHits, processingTimeMS } = this.props;

    return (
      <div className={cx('')}>
        <span className={cx('text')}>
          {translate('stats', nbHits, processingTimeMS)}
        </span>
      </div>
    );
  }
}

export default translatable({
  stats: (n, ms) =>
    `${n.toLocaleString()} results found in ${ms.toLocaleString()}ms`,
})(Stats);
