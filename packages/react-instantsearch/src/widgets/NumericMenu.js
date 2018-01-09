import React from 'react';
import connectNumericMenu from '../connectors/connectNumericMenu';
import AutoHideContainer from '../components/AutoHideContainer';
import Panel from '../components/Panel';
import NumericMenuComponent from '../components/NumericMenu';
import createClassNames from '../components/createClassNames';

const cx = createClassNames('NumericMenu');

/**
 * NumericMenu is a widget used for selecting the range value of a numeric attribute.
 * @name NumericMenu
 * @kind widget
 * @requirements The attribute passed to the `attributeName` prop must be holding numerical values.
 * @propType {string} attributeName - the name of the attribute in the records
 * @propType {{label: string, start: number, end: number}[]} items - List of options. With a text label, and upper and lower bounds.
 * @propType {string} [defaultRefinement] - the value of the item selected by default, follow the format "min:max".
 * @propType {boolean} [autoHideContainer=false] - Hide the container when no results match.
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @propType {node} [header] - Adds a header to the widget.
 * @propType {node} [footer] - Adds a footer to the widget.
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
 * import { NumericMenu, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <NumericMenu
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

const NumericMenu = connectNumericMenu(props => (
  <AutoHideContainer {...props}>
    <Panel {...props} cx={cx}>
      <NumericMenuComponent {...props} cx={cx} />
    </Panel>
  </AutoHideContainer>
));

export default NumericMenu;
