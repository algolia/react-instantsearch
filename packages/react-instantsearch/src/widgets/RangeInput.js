import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BaseWidget from './BaseWidget';
import connectRange from '../connectors/connectRange.js';
import RangeInputComponent from '../components/RangeInput.js';
import classNames from '../components/classNames';

const cx = classNames('RangeInput');

/**
 * RangeInput allows a user to select a numeric range using a minimum and maximum input.
 * @name RangeInput
 * @kind widget
 * @requirements The attribute passed to the `attributeName` prop must be holding numerical values.
 * @propType {string} attributeName - the name of the attribute in the record
 * @propType {{min: number, max: number}} [defaultRefinement] - Default state of the widget containing the start and the end of the range.
 * @propType {number} [min] - Minimum value. When this isn't set, the minimum value will be automatically computed by Algolia using the data in the index.
 * @propType {number} [max] - Maximum value. When this isn't set, the maximum value will be automatically computed by Algolia using the data in the index.
 * @propType {number} [precision=2] - Number of digits after decimal point to use.
 * @themeKey ais-RangeInput__root - The root component of the widget
 * @themeKey ais-RangeInput__labelMin - The label for the min input
 * @themeKey ais-RangeInput__inputMin - The min input
 * @themeKey ais-RangeInput__separator - The separator between input
 * @themeKey ais-RangeInput__labelMax - The label for the max input
 * @themeKey ais-RangeInput__inputMax - The max input
 * @themeKey ais-RangeInput__submit - The submit button
 * @themeKey ais-RangeInput__noRefinement - present when there is no refinement
 * @translationKey submit - Label value for the submit button
 * @translationKey separator - Label value for the input separator
 * @example
 * import React from 'react';
 *
 * import { RangeInput, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <RangeInput attributeName="price"/>
 *     </InstantSearch>
 *   );
 * }
 */

class Widget extends Component {
  componentWillMount() {
    if (this.context.canRefine) {
      this.context.canRefine(this.props.canRefine);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.context.canRefine &&
      this.props.canRefine !== nextProps.canRefine
    ) {
      this.context.canRefine(nextProps.canRefine);
    }
  }

  render() {
    const { header, footer, canRefine } = this.props;
    return (
      <BaseWidget
        cx={cx}
        header={header}
        footer={footer}
        cantRefine={!canRefine}
      >
        <RangeInputComponent cx={cx} {...this.props} />
      </BaseWidget>
    );
  }
}

Widget.propTypes = {
  canRefine: PropTypes.bool.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectRange(Widget);
