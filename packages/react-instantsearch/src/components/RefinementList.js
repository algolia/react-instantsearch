import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { pick } from 'lodash';

import translatable from '../core/translatable';
import classNames from './classNames.js';
import List from './List';
import Highlight from '../widgets/Highlight';
import BaseWidget from './BaseWidget';

const widgetClassName = 'RefinementList';
const cx = classNames(widgetClassName);

class RefinementList extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  static propTypes = {
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
    header: PropTypes.node,
    footer: PropTypes.node,
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
      <label {...cx(['label'])}>
        <input
          {...cx(['checkbox'])}
          type="checkbox"
          checked={item.isRefined}
          onChange={() => this.selectItem(item, resetQuery)}
        />
        <span {...cx(['labelText'])}>{label}</span>{' '}
        <span {...cx(['count'])}>{item.count.toLocaleString()}</span>
      </label>
    );
  };

  render() {
    const { header, footer } = this.props;
    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        header={header}
        footer={footer}
      >
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
})(RefinementList);
