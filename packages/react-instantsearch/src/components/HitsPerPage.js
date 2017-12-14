import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Select from './Select';

class HitsPerPage extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    currentRefinement: PropTypes.number.isRequired,
    transformItems: PropTypes.func,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Number of hits to display.
         */
        value: PropTypes.number.isRequired,

        /**
         * Label to display on the option.
         */
        label: PropTypes.string,
      })
    ),
  };

  render() {
    const { cx, currentRefinement, refine, items } = this.props;
    return (
      <Select
        onSelect={refine}
        selectedItem={currentRefinement}
        items={items}
        cx={cx}
      />
    );
  }
}

export default HitsPerPage;
