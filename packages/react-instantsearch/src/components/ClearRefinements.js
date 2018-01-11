import PropTypes from 'prop-types';
import React, { Component } from 'react';
import translatable from '../core/translatable';
import createClassNames from './createClassNames';

const cx = createClassNames('ClearRefinements');

class ClearRefinements extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    canRefine: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
  };

  render() {
    const { items, canRefine, refine, translate } = this.props;

    return (
      <div className={cx('')}>
        <button
          className={cx('button', !canRefine && 'button--disabled')}
          onClick={() => refine(items)}
          disabled={!canRefine}
        >
          {translate('reset')}
        </button>
      </div>
    );
  }
}

export default translatable({
  reset: 'Clear all filters',
})(ClearRefinements);
