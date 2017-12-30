import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { pick } from 'lodash';

import translatable from '../core/translatable';
import List from './List';
import Link from './Link';

const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    count: PropTypes.number.isRequired,
    items: (...args) => itemsPropType(...args),
  })
);

class HierarchicalMenu extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    createURL: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
    items: itemsPropType,
    showMore: PropTypes.bool,
    limitMin: PropTypes.number,
    limitMax: PropTypes.number,
    transformItems: PropTypes.func,
  };

  renderItem = item => {
    const { cx, createURL, refine } = this.props;

    return (
      <Link
        className={cx('link')}
        onClick={() => refine(item.value)}
        href={createURL(item.value)}
      >
        <span className={cx('label')}>{item.label}</span>{' '}
        <span className={cx('count')}>{item.count}</span>
      </Link>
    );
  };

  render() {
    const { cx } = this.props;

    return (
      <List
        renderItem={this.renderItem}
        cx={cx}
        {...pick(this.props, [
          'translate',
          'items',
          'showMore',
          'limitMin',
          'limitMax',
          'isEmpty',
          'canRefine',
        ])}
      />
    );
  }
}

export default translatable({
  showMore: extended => (extended ? 'Show less' : 'Show more'),
})(HierarchicalMenu);
