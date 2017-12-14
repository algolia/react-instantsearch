import PropTypes from 'prop-types';
import React, { Component } from 'react';

import translatable from '../core/translatable';

class ClearAll extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    refine: PropTypes.func.isRequired,
  };

  render() {
    const { cx, translate, items, refine } = this.props;
    const isDisabled = items.length === 0;

    return (
      <button
        className={cx('button', isDisabled && 'button--disabled')}
        onClick={() => refine(items)}
        disabled={isDisabled}
      >
        {translate('reset')}
      </button>
    );
  }
}

export default translatable({
  reset: 'Clear all filters',
})(ClearAll);
