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

    const flatten = items.reduce(
      (acc, item) => acc.concat(item.items ? item.items : item),
      []
    );

    return (
      <ul className={cx('list')}>
        {flatten.map(item => (
          <li key={item.label} className={cx('item')}>
            <button className={cx('button')} onClick={() => refine(item.value)}>
              <span className={cx('label')}>{item.label}</span>
              <span className={cx('delete')}>
                {translate('clearFilter', item)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default translatable({
  clearFilter: '✕',
})(CurrentRefinements);
