import React from 'react';
import connectStats from '../connectors/connectStats';
import Panel from '../components/Panel';
import StatsComponent from '../components/Stats';
import classNames from '../components/classNames';

const cx = classNames('Stats');

/**
 * The Stats component displays the total number of matching hits and the time it took to get them (time spent in the Algolia server).
 * @name Stats
 * @kind widget
 * @propType {node} [header] - Adds a header to the widget.
 * @propType {node} [footer] - Adds a footer to the widget.
 * @themeKey ais-Stats - the root div of the widget
 * @themeKey ais-Stats-header - the header of the widget (optional)
 * @themeKey ais-Stats-body - the body of the widget
 * @themeKey ais-Stats-text - the text of the widget - the count of items for each item
 * @themeKey ais-Stats-footer - the footer of the widget (optional)
 * @translationkey stats - The string displayed by the stats widget. You get function(n, ms) and you need to return a string. n is a number of hits retrieved, ms is a processed time.
 * @example
 * import React from 'react';
 *
 * import { Stats, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <Stats />
 *     </InstantSearch>
 *   );
 * }
 */

const Stats = connectStats(props => (
  <Panel {...props} cx={cx}>
    <StatsComponent {...props} cx={cx} />
  </Panel>
));

export default Stats;
