import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BaseWidget from './BaseWidget';
import { classNamesNew } from './classNames.js';

const widgetClassName = 'Toggle';
const cx = classNamesNew(widgetClassName);

class Toggle extends Component {
  static propTypes = {
    currentRefinement: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };

  onChange = e => {
    this.props.refine(e.target.checked);
  };

  render() {
    const { currentRefinement, label } = this.props;

    return (
      <BaseWidget widgetClassName={widgetClassName}>
        <label {...cx(['label'])}>
          <input
            {...cx(['checkbox'])}
            type="checkbox"
            checked={currentRefinement}
            onChange={this.onChange}
          />
          <span {...cx(['labelText'])}>{label}</span>
        </label>
      </BaseWidget>
    );
  }
}

export default Toggle;
