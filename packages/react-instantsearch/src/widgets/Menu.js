import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from './BaseWidget';
import connectMenu from '../connectors/connectMenu.js';
import MenuComponent from '../components/Menu.js';
import classNames from '../components/classNames';

const cx = classNames('Menu');

/**
 * The Menu component displays a menu that lets the user choose a single value for a specific attribute.
 * @name Menu
 * @kind widget
 * @requirements The attribute passed to the `attributeName` prop must be present in "attributes for faceting"
 * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
 *
 * If you are using the `withSearchBox` prop, you'll also need to make the attribute searchable using
 * the [dashboard](https://www.algolia.com/explorer/display/) or using the [API](https://www.algolia.com/doc/guides/searching/faceting/#search-for-facet-values).
 * @propType {string} attributeName - the name of the attribute in the record
 * @propType {boolean} [showMore=false] - true if the component should display a button that will expand the number of items
 * @propType {number} [limitMin=10] - the minimum number of diplayed items
 * @propType {number} [limitMax=20] - the maximun number of displayed items. Only used when showMore is set to `true`
 * @propType {string} [defaultRefinement] - the value of the item selected by default
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @propType {node} [header] - Adds a header to the widget.
 * @propType {node} [footer] - Adds a footer to the widget.
 * @propType {boolean} [withSearchBox=false] - true if the component should display an input to search for facet values. <br> In order to make this feature work, you need to make the attribute searchable [using the API](https://www.algolia.com/doc/guides/searching/faceting/?language=js#declaring-a-searchable-attribute-for-faceting) or [the dashboard](https://www.algolia.com/explorer/display/).
 * @themeKey ais-Menu - the root div of the widget
 * @themeKey ais-Menu-header - the header of the widget (optional)
 * @themeKey ais-Menu-body - the body of the widget
 * @themeKey ais-Menu-searchBox - the search box of the widget. See [the SearchBox documentation](widgets/SearchBox.html#classnames) for the classnames and translation keys of the SearchBox.
 * @themeKey ais-Menu-list - the list of all menu items
 * @themeKey ais-Menu-item - the menu list item
 * @themeKey ais-Menu-item--selected - the selected menu list item
 * @themeKey ais-Menu-link - the clickable menu element
 * @themeKey ais-Menu-label - the label of each item
 * @themeKey ais-Menu-count - the count of values for each item
 * @themeKey ais-Menu-showMore - the button used to display more categories
 * @themeKey ais-Menu-showMore--disabled - the disabled button used to display more categories
 * @themeKey ais-Menu-footer - the footer of the widget (optional)
 * @translationkey showMore - The label of the show more button. Accepts one parameters, a boolean that is true if the values are expanded
 * @translationkey noResults - The label of the no results text when no search for facet values results are found.
 * @example
 * import React from 'react';
 *
 * import { Menu, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <Menu
 *         attributeName="category"
 *       />
 *     </InstantSearch>
 *   );
 * }
 */

const Widget = props => (
  <BaseWidget cx={cx} header={props.header} footer={props.footer}>
    <MenuComponent cx={cx} {...props} />
  </BaseWidget>
);

Widget.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectMenu(Widget);
