import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from './BaseWidget';
import connectHitsPerPage from '../connectors/connectHitsPerPage.js';
import HitsPerPageSelectComponent from '../components/HitsPerPage.js';
import classNames from '../components/classNames';

const cx = classNames('ResultsPerPage');

/**
 * The HitsPerPage widget displays a dropdown menu to let the user change the number
 * of displayed hits.
 *
 * If you only want to configure the number of hits per page without
 * displaying a widget, you should use the `<Configure hitsPerPage={20} />` widget. See [`<Configure /> documentation`](widgets/Configure.html)
 *
 * @name HitsPerPage
 * @kind widget
 * @propType {{value: number, label: string}[]} items - List of available options.
 * @propType {number} defaultRefinement - The number of items selected by default
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @themeKey ais-ResultsPerPage - the root div of the widget
 * @themeKey ais-ResultsPerPage-header - the header of the widget (optional)
 * @themeKey ais-ResultsPerPage-body - the body of the widget
 * @themeKey ais-ResultsPerPage-select - the select
 * @themeKey ais-ResultsPerPage-option - the select option
 * @themeKey ais-ResultsPerPage-footer - the footer of the widget (optional)
 * @example
 * import React from 'react';

 * import { HitsPerPage, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <HitsPerPage
 *         defaultRefinement={20}
 *         items={[{value: 20, label: 'Show 20 hits'}, {value: 50, label: 'Show 50 hits'}]}
 *       />
 *     </InstantSearch>
 *   );
 * }
 */

const Widget = props => (
  <BaseWidget cx={cx} header={props.header} footer={props.footer}>
    <HitsPerPageSelectComponent cx={cx} {...props} />
  </BaseWidget>
);

Widget.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectHitsPerPage(Widget);
