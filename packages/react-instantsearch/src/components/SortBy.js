import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Select from './Select';

class SortBy extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
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
    const { cx, refine, items, currentRefinement } = this.props;
    return (
      <Select
        cx={cx}
        selectedItem={currentRefinement}
        onSelect={refine}
        items={items}
      />
    );
  }
}

export default SortBy;
