import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from './BaseWidget';
import connectInfiniteResults from '../connectors/connectInfiniteResults.js';
import InfiniteResultsComponent from '../components/InfiniteResults.js';
import classNames from '../components/classNames';

const cx = classNames('InfiniteResults');

/**
 * Displays an infinite list of hits along with a **load more** button.
 *
 * To configure the number of hits being shown, use the [HitsPerPage widget](widgets/HitsPerPage.html),
 * [connectHitsPerPage connector](connectors/connectHitsPerPage.html) or the [Configure widget](widgets/Configure.html).
 *
 * @name InfiniteResults
 * @kind widget
 * @propType {Component} hitComponent - Component used for rendering each hit from
 *   the results. If it is not provided the rendering defaults to displaying the
 *   hit in its JSON form. The component will be called with a `hit` prop.
 * @themeKey ais-InfiniteResults - the root div of the widget
 * @themeKey ais-InfiniteResults-header - the header of the widget (optional)
 * @themeKey ais-InfiniteResults-body - the body of the widget
 * @themeKey ais-InfiniteResults-list - the list of hits
 * @themeKey ais-InfiniteResults-item - the hit list item
 * @themeKey ais-InfiniteResults-loadMore - the button used to display more results
 * @themeKey ais-InfiniteResults-loadMore--disabled - the disabled button used to display more results
 * @themeKey ais-InfiniteResults-footer - the footer of the widget (optional)
 * @translationKey loadMore - the label of load more button
 * @example
 * import React from 'react';

 * import { InfiniteResults, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <InfiniteResults />
 *     </InstantSearch>
 *   );
 * }
 */

const Widget = props => (
  <BaseWidget cx={cx} header={props.header} footer={props.footer}>
    <InfiniteResultsComponent cx={cx} {...props} />
  </BaseWidget>
);

Widget.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectInfiniteResults(Widget);
