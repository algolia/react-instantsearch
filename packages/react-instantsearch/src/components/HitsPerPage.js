import PropTypes from 'prop-types';
import React, { Component } from 'react';
import createClassNames from './createClassNames';
import Select from './Select';

const cx = createClassNames('HitsPerPage');

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
      <div className={cx('')}>
        <Select
          onSelect={refine}
          selectedItem={currentRefinement}
          items={items}
          cx={cx}
        />
      </div>
    );
  }
}

export default HitsPerPage;
