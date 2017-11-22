import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { pick } from 'lodash';
import translatable from '../core/translatable';
import List from './List';
import Link from './Link';
import Highlight from '../widgets/Highlight';
import BaseWidget from './BaseWidget';
import classNames from './classNames.js';

const widgetClassName = 'Menu';
const cx = classNames(widgetClassName);

class Menu extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    searchForItems: PropTypes.func.isRequired,
    withSearchBox: PropTypes.bool,
    createURL: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
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

  static contextTypes = {
    canRefine: PropTypes.func,
  };

  componentWillMount() {
    if (this.context.canRefine) this.context.canRefine(this.props.canRefine);
  }

  componentWillReceiveProps(props) {
    if (this.context.canRefine) this.context.canRefine(props.canRefine);
  }

  renderItem = (item, resetQuery) => {
    const { createURL } = this.props;
    const label = this.props.isFromSearch ? (
      <Highlight attributeName="label" hit={item} />
    ) : (
      item.label
    );
    return (
      <Link
        {...cx(['link', item.isRefined && 'item--selected'])}
        onClick={() => this.selectItem(item, resetQuery)}
        href={createURL(item.value)}
      >
        <span {...cx(['label'])}>{label}</span>{' '}
        <span {...cx(['count'])}>{item.count}</span>
      </Link>
    );
  };

  selectItem = (item, resetQuery) => {
    resetQuery();
    this.props.refine(item.value);
  };

  render() {
    return (
      <BaseWidget widgetClassName={widgetClassName}>
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
        />
      </BaseWidget>
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
})(Menu);
