import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from './BaseWidget';
import connectMultiRange from '../connectors/connectMultiRange.js';
import MultiRangeComponent from '../components/MultiRange.js';
import classNames from '../components/classNames';

const cx = classNames('NumericMenu');

/**
 * MultiRange is a widget used for selecting the range value of a numeric attribute.
 * @name MultiRange
 * @kind widget
 * @requirements The attribute passed to the `attributeName` prop must be holding numerical values.
 * @propType {string} attributeName - the name of the attribute in the records
 * @propType {{label: string, start: number, end: number}[]} items - List of options. With a text label, and upper and lower bounds.
 * @propType {string} [defaultRefinement] - the value of the item selected by default, follow the format "min:max".
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @themeKey ais-NumericMenu - the root div of the widget
 * @themeKey ais-NumericMenu-header - the header of the widget (optional)
 * @themeKey ais-NumericMenu-body - the body of the widget
 * @themeKey ais-NumericMenu-list - the list of all refinement items
 * @themeKey ais-NumericMenu-item - the refinement list item
 * @themeKey ais-NumericMenu-item--selected - the selected refinement list item
 * @themeKey ais-NumericMenu-label - the label of each refinement item
 * @themeKey ais-NumericMenu-radio - the radio input of each refinement item
 * @themeKey ais-NumericMenu-labelText - the label text of each refinement item
 * @themeKey ais-NumericMenu-footer - the footer of the widget (optional)
 * @translationkey all - The label of the largest range added automatically by react instantsearch
 * @example
 * import React from 'react';
 *
 * import { MultiRange, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <MultiRange
 *         attributeName="price"
 *         items={[
 *           { end: 10, label: '<$10' },
 *           { start: 10, end: 100, label: '$10-$100' },
 *           { start: 100, end: 500, label: '$100-$500' },
 *           { start: 500, label: '>$500' },
 *         ]}
 *       />
 *     </InstantSearch>
 *   );
 * }
 */

const Widget = props => (
  <BaseWidget cx={cx} header={props.header} footer={props.footer}>
    <MultiRangeComponent cx={cx} {...props} />
  </BaseWidget>
);

Widget.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectMultiRange(Widget);
