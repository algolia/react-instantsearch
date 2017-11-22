import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Select from './Select';
import BaseWidget from './BaseWidget';
import classNames from './classNames.js';

const widgetClassName = 'ResultsPerPage';
const cx = classNames(widgetClassName);

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
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  render() {
    const { currentRefinement, refine, items, header, footer } = this.props;
    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        header={header}
        footer={footer}
      >
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
