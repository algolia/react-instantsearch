import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from './BaseWidget';
import connectCurrentRefinements from '../connectors/connectCurrentRefinements.js';
import ClearRefinementsComponent from '../components/ClearRefinements.js';
import classNames from '../components/classNames';

const cx = classNames('ClearRefinements');

/**
 * The ClearRefinements widget displays a button that lets the user clean every refinement applied
 * to the search.
 * @name ClearRefinements
 * @kind widget
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @propType {boolean} [clearsQuery=false] - Pass true to also clear the search query
 * @themeKey ais-ClearRefinements - the root div of the widget
 * @themeKey ais-ClearRefinements-header - the header of the widget (optional)
 * @themeKey ais-ClearRefinements-body - the body of the widget
 * @themeKey ais-ClearRefinements-button - the clickable button
 * @themeKey ais-ClearRefinements-button--disabled - the disabled clickable button
 * @themeKey ais-ClearRefinements-footer - the footer of the widget (optional)
 * @translationKey reset - the clear all button value
 * @example
 * import React from 'react';
 *
 * import { ClearRefinements, RefinementList, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <ClearRefinements />
 *       <RefinementList
          attributeName="colors"
          defaultRefinement={['Black']}
        />
 *     </InstantSearch>
 *   );
 * }
 */

const Widget = props => (
  <BaseWidget cx={cx} header={props.header} footer={props.footer}>
    <ClearRefinementsComponent cx={cx} {...props} />
  </BaseWidget>
);

Widget.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectCurrentRefinements(Widget);
