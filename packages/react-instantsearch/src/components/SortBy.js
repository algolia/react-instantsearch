import React, {PropTypes, Component} from 'react';

import themeable from '../core/themeable';

import Select from './Select';

import theme from './SortBy.css';

class SortBy extends Component {
  static propTypes = {
    applyTheme: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,

    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,

    currentRefinement: PropTypes.string.isRequired,
  };

  onChange = e => {
    this.props.refine(e.target.value);
  }

  render() {
    const {applyTheme, refine, items, currentRefinement} = this.props;
    return (
      <Select
        applyTheme={applyTheme}
        selectedItem={currentRefinement}
        onSelect={refine}
        items={items}
      />
    );
  }
}

export default themeable(theme)(SortBy);
