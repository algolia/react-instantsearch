import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { pick } from 'lodash';

import translatable from '../core/translatable';
import List from './List';
import Highlight from '../widgets/Highlight';

class RefinementList extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  static propTypes = {
    cx: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    searchForItems: PropTypes.func.isRequired,
    withSearchBox: PropTypes.bool,
    createURL: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
        count: PropTypes.number.isRequired,
        isRefined: PropTypes.bool.isRequired,
      })
    ),
    isFromSearch: PropTypes.bool.isRequired,
    canRefine: PropTypes.bool.isRequired,
    showMore: PropTypes.bool,
    limitMin: PropTypes.number,
    limitMax: PropTypes.number,
    transformItems: PropTypes.func,
  };

  selectItem = (item, resetQuery) => {
    resetQuery();
    this.props.refine(item.value);
  };

  renderItem = (item, resetQuery) => {
    const label = this.props.isFromSearch ? (
      <Highlight attributeName="label" hit={item} />
    ) : (
      item.label
    );

    return (
      <label className={this.props.cx('label')}>
        <input
          className={this.props.cx('checkbox')}
          type="checkbox"
          checked={item.isRefined}
          onChange={() => this.selectItem(item, resetQuery)}
        />
        <span className={this.props.cx('labelText')}>{label}</span>{' '}
        <span className={this.props.cx('count')}>
          {item.count.toLocaleString()}
        </span>
      </label>
    );
  };

  render() {
    const { cx } = this.props;
    return (
      <List
        renderItem={this.renderItem}
        selectItem={this.selectItem}
        cx={cx}
        {...pick(this.props, [
          'translate',
          'items',
          'showMore',
          'limitMin',
          'limitMax',
          'isFromSearch',
          'searchForItems',
          'withSearchBox',
          'canRefine',
        ])}
        query={this.state.query}
      />
    );
  }
}

export default translatable({
  showMore: extended => (extended ? 'Show less' : 'Show more'),
  noResults: 'No results',
  submit: null,
  reset: null,
  resetTitle: 'Clear the search query.',
  submitTitle: 'Submit your search query.',
  placeholder: 'Search here…',
})(RefinementList);
