import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import translatable from '../core/translatable';
import createClassNames from '../components/createClassNames';

const cx = createClassNames('CurrentRefinements');

class CurrentRefinements extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
      })
    ).isRequired,
    canRefine: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { items, canRefine, refine, translate, className } = this.props;

    const flatten = items.reduce(
      (acc, item) => acc.concat(item.items ? item.items : item),
      []
    );

    return (
      <div
        className={classNames(cx('', !canRefine && '-noRefinement'), className)}
      >
        <ul className={cx('list', !canRefine && 'list--noRefinement')}>
          {flatten.map(item => (
            <li key={item.label} className={cx('item')}>
              <button
                className={cx('button')}
                onClick={() => refine(item.value)}
              >
                <span className={cx('label')}>{item.label}</span>
                <span className={cx('delete')}>
                  {translate('clearFilter', item)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default translatable({
  clearFilter: '✕',
})(CurrentRefinements);
