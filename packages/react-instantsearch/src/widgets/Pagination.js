import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from './BaseWidget';
import connectPagination from '../connectors/connectPagination.js';
import PaginationComponent from '../components/Pagination.js';
import classNames from '../components/classNames';

const cx = classNames('Pagination');

/**
 * The Pagination widget displays a simple pagination system allowing the user to
 * change the current page.
 * @name Pagination
 * @kind widget
 * @propType {boolean} [showFirst=true] - Display the first page link.
 * @propType {boolean} [showLast=false] - Display the last page link.
 * @propType {boolean} [showPrevious=true] - Display the previous page link.
 * @propType {boolean} [showNext=true] - Display the next page link.
 * @propType {number} [pagesPadding=3] - How many page links to display around the current page.
 * @propType {number} [maxPages=Infinity] - Maximum number of pages to display.
 * @themeKey ais-Pagination - the root div of the widget
 * @themeKey ais-Pagination-header - the header of the widget (optional)
 * @themeKey ais-Pagination-body - the body of the widget
 * @themeKey ais-Pagination-list - the list of all pagination items
 * @themeKey ais-Pagination-item - the pagination list item
 * @themeKey ais-Pagination-item--previousPage - the "previous" pagination list item
 * @themeKey ais-Pagination-item--nextPage - the "next" pagination list item
 * @themeKey ais-Pagination-item--page - the "page" pagination list item
 * @themeKey ais-Pagination-item--selected - the selected pagination list item
 * @themeKey ais-Pagination-item--disabled - the disabled pagination list item
 * @themeKey ais-Pagination-item--link - the pagination clickable element
 * @themeKey ais-Pagination-footer - the footer of the widget (optional)
 * @translationKey previous - Label value for the previous page link
 * @translationKey next - Label value for the next page link
 * @translationKey first - Label value for the first page link
 * @translationKey last - Label value for the last page link
 * @translationkey page - Label value for a page item. You get function(currentRefinement) and you need to return a string
 * @translationKey ariaPrevious - Accessibility label value for the previous page link
 * @translationKey ariaNext - Accessibility label value for the next page link
 * @translationKey ariaFirst - Accessibility label value for the first page link
 * @translationKey ariaLast - Accessibility label value for the last page link
 * @translationkey ariaPage - Accessibility label value for a page item. You get function(currentRefinement) and you need to return a string
 * @example
 * import React from 'react';
 *
 * import { Pagination, InstantSearch } from '../packages/react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <Pagination />
 *     </InstantSearch>
 *   );
 * }
 */

const Widget = props => (
  <BaseWidget cx={cx} header={props.header} footer={props.footer}>
    <PaginationComponent cx={cx} {...props} />
  </BaseWidget>
);

Widget.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectPagination(Widget);
