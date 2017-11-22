import PropTypes from 'prop-types';
import React, { Component } from 'react';

import translatable from '../core/translatable';
import classNames from './classNames.js';
import BaseWidget from './BaseWidget';

const widgetClassName = 'ClearRefinements';
const cx = classNames(widgetClassName);

class ClearAll extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    refine: PropTypes.func.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  render() {
    const { translate, items, refine, header, footer } = this.props;
    const isDisabled = items.length === 0;

    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        header={header}
        footer={footer}
      >
        {isDisabled ? (
          <button {...cx(['button'])} disabled>
            {translate(['reset'])}
          </button>
        ) : (
          <button
            {...cx(['button', 'button--disabled'])}
            onClick={refine.bind(null, items)}
          >
            {translate('reset')}
          </button>
        )}
      </BaseWidget>
    );
  }
}

export default translatable({
  reset: 'Clear all filters',
})(ClearAll);
