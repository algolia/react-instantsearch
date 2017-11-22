import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BaseWidget from './BaseWidget';
import translatable from '../core/translatable';
import { classNamesNew } from './classNames.js';

const widgetClassName = 'Stats';
const cx = classNamesNew(widgetClassName);

class Stats extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    nbHits: PropTypes.number.isRequired,
    processingTimeMS: PropTypes.number.isRequired,
  };

  render() {
    const { translate, nbHits, processingTimeMS } = this.props;
    return (
      <BaseWidget widgetClassName={widgetClassName}>
        <span {...cx(['text'])}>
          {translate('stats', nbHits, processingTimeMS)}
        </span>
      </BaseWidget>
    );
  }
}

export default translatable({
  stats: (n, ms) =>
    `${n.toLocaleString()} results found in ${ms.toLocaleString()}ms`,
})(Stats);
