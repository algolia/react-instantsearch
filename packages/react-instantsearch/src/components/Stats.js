import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BaseWidget from './BaseWidget';
import translatable from '../core/translatable';
import classNames from './classNames.js';

const widgetClassName = 'Stats';
const cx = classNames(widgetClassName);

class Stats extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    nbHits: PropTypes.number.isRequired,
    processingTimeMS: PropTypes.number.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  render() {
    const { translate, nbHits, processingTimeMS, header, footer } = this.props;
    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        header={header}
        footer={footer}
      >
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
