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
  };

  render() {
    const { refine, items, currentRefinement } = this.props;
    return (
      <BaseWidget widgetClassName={widgetClassName}>
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
