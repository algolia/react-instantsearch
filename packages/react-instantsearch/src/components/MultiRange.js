import PropTypes from 'prop-types';
import React, { Component } from 'react';
import List from './List';
import BaseWidget from './BaseWidget';
import classNames from './classNames.js';
import translatable from '../core/translatable';

const widgetClassName = 'NumericMenu';
const cx = classNames(widgetClassName);

class MultiRange extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node.isRequired,
        value: PropTypes.string.isRequired,
        isRefined: PropTypes.bool.isRequired,
        noRefinement: PropTypes.bool.isRequired,
      })
    ).isRequired,
    refine: PropTypes.func.isRequired,
    transformItems: PropTypes.func,
    canRefine: PropTypes.bool.isRequired,
    translate: PropTypes.func.isRequired,
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
    const { refine, translate } = this.props;
    const label = item.value === '' ? translate('all') : item.label;
    return (
      <label {...cx(['label'])}>
        <input
          {...cx(['radio'])}
          type="radio"
          checked={item.isRefined}
          disabled={item.noRefinement}
          onChange={refine.bind(null, item.value)}
        />
        <span {...cx(['labelText'])}>{label}</span>
      </label>
    );
  };

  render() {
    const { items, canRefine, header, footer } = this.props;

    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        header={header}
        footer={footer}
      >
        <List
          renderItem={this.renderItem}
          showMore={false}
          canRefine={canRefine}
          cx={cx}
          items={items.map(item => ({ ...item, key: item.value }))}
        />
      </BaseWidget>
    );
  }
}

export default translatable({
  all: 'All',
})(MultiRange);
