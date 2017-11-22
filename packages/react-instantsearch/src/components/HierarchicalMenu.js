import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { pick } from 'lodash';

import translatable from '../core/translatable';
import classNames from './classNames.js';
import List from './List';
import Link from './Link';
import BaseWidget from './BaseWidget';

const widgetClassName = 'HierarchicalMenu';
const cx = classNames(widgetClassName);

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
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    createURL: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
    items: itemsPropType,
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

  renderItem = item => {
    const { createURL, refine } = this.props;

    return (
      <Link
        {...cx(['link'])}
        onClick={() => refine(item.value)}
        href={createURL(item.value)}
      >
        <span {...cx(['label'])}>{item.label}</span>{' '}
        <span {...cx(['count'])}>{item.count}</span>
      </Link>
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
      </BaseWidget>
    );
  }
}

export default translatable({
  showMore: extended => (extended ? 'Show less' : 'Show more'),
})(HierarchicalMenu);
