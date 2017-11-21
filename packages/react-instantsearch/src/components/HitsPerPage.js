import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Select from './Select';
import BaseWidget from './BaseWidget';
import { classNamesNew } from './classNames.js';

const widgetClassName = 'ResultsPerPage';
const cx = classNamesNew(widgetClassName);

class HitsPerPage extends Component {
  static propTypes = {
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
    const { currentRefinement, refine, items } = this.props;
    return (
      <BaseWidget widgetClassName={widgetClassName}>
        <Select
          onSelect={refine}
          selectedItem={currentRefinement}
          items={items}
          cx={cx}
        />
      </BaseWidget>
    );
  }
}

export default HitsPerPage;
