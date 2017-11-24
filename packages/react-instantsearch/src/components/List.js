import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';

const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.node.isRequired,
    items: (...args) => itemsPropType(...args),
  })
);

class List extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    // Only required with showMore.
    translate: PropTypes.func,
    items: itemsPropType,
    renderItem: PropTypes.func.isRequired,
    selectItem: PropTypes.func,
    showMore: PropTypes.bool,
    limitMin: PropTypes.number,
    limitMax: PropTypes.number,
    limit: PropTypes.number,
    show: PropTypes.func,
    searchForItems: PropTypes.func,
    withSearchBox: PropTypes.bool,
    isFromSearch: PropTypes.bool,
    canRefine: PropTypes.bool,
  };

  static defaultProps = {
    isFromSearch: false,
  };

  constructor() {
    super();

    this.state = {
      extended: false,
      query: '',
    };
  }

  onShowMoreClick = () => {
    this.setState(state => ({
      extended: !state.extended,
    }));
  };

  getLimit = () => {
    const { limitMin, limitMax } = this.props;
    const { extended } = this.state;
    return extended ? limitMax : limitMin;
  };

  resetQuery = () => {
    this.setState({ query: '' });
  };

  renderItem = (item, resetQuery) => {
    const items = item.items && (
      <ul {...this.props.cx(['list'])}>
        {item.items
          .slice(0, this.getLimit())
          .map(child => this.renderItem(child, item))}
      </ul>
    );

    return (
      <li
        key={item.key || item.label}
        {...this.props.cx([
          'item',
          item.isRefined && 'item--selected',
          item.noRefinement && 'item--noRefinement',
          items && 'item--parent',
        ])}
      >
        {this.props.renderItem(item, resetQuery)}
        {items}
      </li>
    );
  };

  renderShowMore() {
    const { showMore, translate, cx } = this.props;
    const { extended } = this.state;
    const disabled = this.props.limitMin >= this.props.items.length;
    if (!showMore) {
      return null;
    }

    return (
      <button
        disabled={disabled}
        {...cx(['showMore', disabled && 'showMore--disabled'])}
        onClick={this.onShowMoreClick}
      >
        {translate('showMore', extended)}
      </button>
    );
  }

  renderSearchBox() {
    const {
      cx,
      searchForItems,
      isFromSearch,
      translate,
      items,
      selectItem,
    } = this.props;

    const noResults =
      items.length === 0 && this.state.query !== '' ? (
        <div {...cx(['noResults'])}>{translate('noResults')}</div>
      ) : null;
    return (
      <div {...cx(['searchbox'])}>
        <SearchBox
          currentRefinement={this.state.query}
          refine={value => {
            this.setState({ query: value });
            searchForItems(value);
          }}
          focusShortcuts={[]}
          translate={translate}
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            if (isFromSearch) {
              selectItem(items[0], this.resetQuery);
            }
          }}
        />
        {noResults}
      </div>
    );
  }

  render() {
    const { cx, items, withSearchBox, canRefine } = this.props;
    const searchBox = withSearchBox ? this.renderSearchBox() : null;
    if (items.length === 0) {
      return (
        <ul {...cx(['list', !canRefine && 'noRefinement'])}>{searchBox}</ul>
      );
    }

    // Always limit the number of items we show on screen, since the actual
    // number of retrieved items might vary with the `maxValuesPerFacet` config
    // option.
    const limit = this.getLimit();
    return (
      <ul {...cx(['list', !this.props.canRefine && 'list--noRefinement'])}>
        {searchBox}
        {items
          .slice(0, limit)
          .map(item => this.renderItem(item, this.resetQuery))}
        {this.renderShowMore()}
      </ul>
    );
  }
}

export default List;
