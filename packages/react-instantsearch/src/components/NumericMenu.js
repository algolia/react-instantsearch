import PropTypes from 'prop-types';
import React, { Component } from 'react';
import List from './List';
import translatable from '../core/translatable';

class NumericMenu extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node.isRequired,
        value: PropTypes.string.isRequired,
        isRefined: PropTypes.bool.isRequired,
        noRefinement: PropTypes.bool.isRequired,
      })
    ).isRequired,
    refine: PropTypes.func.isRequired,
    transformItems: PropTypes.func,
    canRefine: PropTypes.bool.isRequired,
    translate: PropTypes.func.isRequired,
  };

  renderItem = item => {
    const { cx, refine, translate } = this.props;
    const label = item.value === '' ? translate('all') : item.label;
    return (
      <label className={cx('label')}>
        <input
          className={cx('radio')}
          type="radio"
          checked={item.isRefined}
          disabled={item.noRefinement}
          onChange={() => refine(item.value)}
        />
        <span className={cx('labelText')}>{label}</span>
      </label>
    );
  };

  render() {
    const { cx, items, canRefine } = this.props;

    return (
      <List
        renderItem={this.renderItem}
        showMore={false}
        canRefine={canRefine}
        cx={cx}
        items={items.map(item => ({ ...item, key: item.value }))}
      />
    );
  }
}

export default translatable({
  all: 'All',
})(NumericMenu);
