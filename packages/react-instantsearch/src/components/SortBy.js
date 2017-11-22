import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Select from './Select';
import BaseWidget from './BaseWidget';
import classNames from './classNames.js';

const widgetClassName = 'SortBy';
const cx = classNames(widgetClassName);

class SortBy extends Component {
  static propTypes = {
    refine: PropTypes.func.isRequired,

    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,

    currentRefinement: PropTypes.string.isRequired,
    transformItems: PropTypes.func,
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  render() {
    const { refine, items, currentRefinement, header, footer } = this.props;
    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        header={header}
        footer={footer}
      >
        <Select
          cx={cx}
          selectedItem={currentRefinement}
          onSelect={refine}
          items={items}
        />
      </BaseWidget>
    );
  }
}

export default SortBy;
