import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import translatable from '../core/translatable';
import createClassNames from '../components/createClassNames';

const cx = createClassNames('CurrentRefinements');

const itemPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.func.isRequired,
    items: (...args) => itemPropTypes(...args),
  })
);

export class CurrentRefinements extends Component {
  static propTypes = {
    items: itemPropTypes.isRequired,
    canRefine: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  renderItem(item) {
    const { refine, translate } = this.props;

    return (
      <span key={item.label} className={cx('category')}>
        <span className={cx('categoryLabel')}>{item.label}</span>
        <button className={cx('delete')} onClick={() => refine(item.value)}>
          {translate('clearFilter', item)}
        </button>
      </span>
    );
  }

  render() {
    const { items, canRefine, className } = this.props;

    return (
      <div
        className={classNames(cx('', !canRefine && '-noRefinement'), className)}
      >
        <ul className={cx('list', !canRefine && 'list--noRefinement')}>
          {items.map(
            item =>
              item.items ? (
                <li key={item.label} className={cx('item')}>
                  <span className={cx('label')}>{item.label}</span>
                  {item.items.map(nest => this.renderItem(nest))}
                </li>
              ) : (
                <li key={item.label} className={cx('item')}>
                  {this.renderItem(item)}
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
}

export default translatable({
  clearFilter: '✕',
})(CurrentRefinements);
