import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from './Link';
import translatable from '../core/translatable';

const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })
);

class Breadcrumb extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
    createURL: PropTypes.func.isRequired,
    items: itemsPropType,
    refine: PropTypes.func.isRequired,
    rootURL: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    translate: PropTypes.func.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  render() {
    const {
      cx,
      canRefine,
      createURL,
      items,
      refine,
      rootURL,
      separator,
      translate,
    } = this.props;
    const rootPath = canRefine ? (
      <li className={cx('item')}>
        <Link
          className={cx('link')}
          onClick={() => (!rootURL ? refine() : null)}
          href={rootURL ? rootURL : createURL()}
        >
          {translate('rootLabel')}
        </Link>
      </li>
    ) : null;

    const breadcrumb = items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <li className={cx('item', isLast && 'item--selected')} key={idx}>
          <span className={cx('separator')}>{separator}</span>
          {!isLast ? (
            <Link
              className={cx('link')}
              onClick={() => refine(item.value)}
              href={createURL(item.value)}
            >
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </li>
      );
    });

    return (
      <ul className={cx('list')}>
        {rootPath}
        {breadcrumb}
      </ul>
    );
  }
}

export default translatable({
  rootLabel: 'Home',
})(Breadcrumb);
