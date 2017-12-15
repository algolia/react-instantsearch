import PropTypes from 'prop-types';
import React, { Component } from 'react';

import translatable from '../core/translatable';

class CurrentRefinements extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
      })
    ).isRequired,
    refine: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
    transformItems: PropTypes.func,
    translate: PropTypes.func.isRequired,
  };

  render() {
    const { cx, translate, items, refine } = this.props;

    return (
      <ul className={cx('list')}>
        {items.filter(item => item.items).map(item =>
          item.items.map(nestedItem => (
            <li key={nestedItem.label} className={cx('item')}>
              <button
                className={cx('button')}
                onClick={() => refine(nestedItem.value)}
              >
                <span className={cx('label')}>{nestedItem.label}</span>
                <span className={cx('delete')}>
                  {translate('clearFilter', nestedItem)}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    );
  }
}

export default translatable({
  clearFilter: '✕',
})(CurrentRefinements);
