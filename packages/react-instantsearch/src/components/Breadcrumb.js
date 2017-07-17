import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { pick } from 'lodash';
import translatable from '../core/translatable';
import List from './List';
import Link from './Link';
import classNames from './classNames.js';

const cx = classNames('Breadcrumb');
/*
class Breadcrumb extends Component {
  render() {
    console.log('props', this.props);
    return <div>{this.props.currentRefinement}</div>;
  }
}*/

class Breadcrumb extends Component {
  renderItem = item => {
    const { createURL, refine } = this.props;
    console.log(this.props);
    return (
      <div>
        <Link
          {...cx('itemLink')}
          onClick={() => refine(item.value)}
          href={createURL(item.value)}
        >
          <span {...cx('itemLabel')}>
            {item.label}
          </span>

        </Link>
        <span> &gt; </span>
      </div>
    );
  };

  render() {
    //map avec separator
    return (
      <List
        renderItem={this.renderItem}
        cx={cx}
        {...pick(this.props, ['translate', 'items', 'canRefine'])}
      />
    );
  }
}

export default Breadcrumb;
