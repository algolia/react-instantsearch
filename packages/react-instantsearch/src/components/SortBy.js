import PropTypes from 'prop-types';
import React, { Component } from 'react';
import createClassNames from './createClassNames';
import Select from './Select';

const cx = createClassNames('SortBy');

class SortBy extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
  };

  render() {
    const { items, currentRefinement, refine } = this.props;

    return (
      <div className={cx('')}>
        <Select
          cx={cx}
          items={items}
          selectedItem={currentRefinement}
          onSelect={refine}
        />
      </div>
    );
  }
}

export default SortBy;
