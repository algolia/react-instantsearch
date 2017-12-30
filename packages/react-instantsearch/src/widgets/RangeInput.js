import React from 'react';
import connectRange from '../connectors/connectRange';
import AutoHideContainer from '../components/AutoHideContainer';
import Panel from '../components/Panel';
import RangeInputComponent from '../components/RangeInput';
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
 * @propType {boolean} [autoHideContainer=false] - Hide the container when there are no refinements available.
 * @propType {node} [header] - Adds a header to the widget.
 * @propType {node} [footer] - Adds a footer to the widget.
 * @themeKey ais-RangeInput - the root div of the widget
 * @themeKey ais-RangeInput-header - the header of the widget (optional)
 * @themeKey ais-RangeInput-body - the body of the widget
 * @themeKey ais-RangeInput-form - the wrapping form
 * @themeKey ais-RangeInput-label - the label wrapping inputs
 * @themeKey ais-RangeInput-input - the input (number)
 * @themeKey ais-RangeInput-input--min - the minimum input
 * @themeKey ais-RangeInput-input--max - the maximum input
 * @themeKey ais-RangeInput-separator - the separator word used between the two inputs
 * @themeKey ais-RangeInput-button - the submit button
 * @themeKey ais-RangeInput-footer - the footer of the widget (optional)
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

const RangeInput = connectRange(props => (
  <AutoHideContainer {...props}>
    <Panel {...props} cx={cx}>
      <RangeInputComponent {...props} cx={cx} />
    </Panel>
  </AutoHideContainer>
));

export default RangeInput;
