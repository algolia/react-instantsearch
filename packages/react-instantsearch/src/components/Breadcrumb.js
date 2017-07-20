import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { pick } from 'lodash';
import translatable from '../core/translatable';
import List from './List';
import Link from './Link';
import classNames from './classNames.js';

const cx = classNames('Breadcrumb');

class Breadcrumb extends Component {
  static propTypes = {
    refine: PropTypes.func.isRequired,
    createURL: PropTypes.func.isRequired,
    separator: PropTypes.string,
  };

  render() {
    console.log('separator', this.props.separator);
    const { createURL, refine, items } = this.props;
    const breadcrumb = items.map((item, idx) => {
      const separator = idx === items.length - 1 ? '' : this.props.separator;
      return (
        <Link
          {...cx('itemLink')}
          onClick={() => refine(item.value)}
          href={createURL(item.value)}
          key={idx}
        >
          <span {...cx('itemLabel')}>
            {item.label}
          </span>
          {separator}
        </Link>
      );
    });

    return <div>{breadcrumb}</div>;
  }
}

export default Breadcrumb;
