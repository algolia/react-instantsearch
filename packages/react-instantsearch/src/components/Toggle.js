import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BaseWidget from './BaseWidget';
import classNames from './classNames.js';

const widgetClassName = 'Toggle';
const cx = classNames(widgetClassName);

class Toggle extends Component {
  static propTypes = {
    currentRefinement: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  onChange = e => {
    this.props.refine(e.target.checked);
  };

  render() {
    const { currentRefinement, label, header, footer } = this.props;

    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        header={header}
        footer={footer}
      >
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
