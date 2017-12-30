import React from 'react';
import connectCurrentRefinements from '../connectors/connectCurrentRefinements';
import AutoHideContainer from '../components/AutoHideContainer';
import Panel from '../components/Panel';
import CurrentRefinementsComponent from '../components/CurrentRefinements';
import classNames from '../components/classNames';

const cx = classNames('CurrentRefinements');

/**
 * The CurrentRefinements widget displays the list of currently applied filters.
 *
 * It allows the user to selectively remove them.
 * @name CurrentRefinements
 * @kind widget
 * @propType {boolean} [autoHideContainer=false] - Hide the container when there are no current refinements.
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @propType {node} [header] - Adds a header to the widget.
 * @propType {node} [footer] - Adds a footer to the widget.
 * @themeKey ais-CurrentRefinements - the root div of the widget
 * @themeKey ais-CurrentRefinements-header - the header of the widget (optional)
 * @themeKey ais-CurrentRefinements-body - the body of the widget
 * @themeKey ais-CurrentRefinements-list - the list of all refined items
 * @themeKey ais-CurrentRefinements-item - the refined list item
 * @themeKey ais-CurrentRefinements-button - the button of each refined list item
 * @themeKey ais-CurrentRefinements-label - the refined list label
 * @themeKey ais-CurrentRefinements-count - the count of refined values for each item
 * @themeKey ais-CurrentRefinements-delete - the delete button of each label
 * @themeKey ais-CurrentRefinements-reset - the reset button for current selected values
 * @themeKey ais-CurrentRefinements-footer - the footer of the widget (optional)
 * @translationKey clearFilter - the remove filter button label
 * @example
 * import React from 'react';
 *
 * import { CurrentRefinements, RefinementList, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <CurrentRefinements />
 *       <RefinementList
          attributeName="colors"
          defaultRefinement={['Black']}
        />
 *     </InstantSearch>
 *   );
 * }
 */

const CurrentRefinements = connectCurrentRefinements(props => (
  <AutoHideContainer {...props}>
    <Panel {...props} cx={cx}>
      <CurrentRefinementsComponent {...props} cx={cx} />
    </Panel>
  </AutoHideContainer>
));

export default CurrentRefinements;
