import PropTypes from 'prop-types';
import React, { Component } from 'react';

import translatable from '../core/translatable';

class Stats extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    nbHits: PropTypes.number.isRequired,
    processingTimeMS: PropTypes.number.isRequired,
  };

  render() {
    const { cx, translate, nbHits, processingTimeMS } = this.props;
    return (
      <span className={cx('text')}>
        {translate('stats', nbHits, processingTimeMS)}
      </span>
    );
  }
}

export default translatable({
  stats: (n, ms) =>
    `${n.toLocaleString()} results found in ${ms.toLocaleString()}ms`,
})(Stats);
