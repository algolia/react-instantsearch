import React from 'react';
import connectHighlight from '../connectors/connectHighlight';
import HighlightComponent from '../components/Highlight';
import createClassNames from '../components/createClassNames';

const cx = createClassNames('Highlight');

/**
 * Renders any attribute from a hit into its highlighted form when relevant.
 *
 * Read more about it in the [Highlighting results](guide/Highlighting_results.html) guide.
 * @name Highlight
 * @kind widget
 * @propType {string} attributeName - location of the highlighted attribute in the hit (the corresponding element can be either a string or an array of strings)
 * @propType {object} hit - hit object containing the highlighted attribute
 * @propType {string} [tagName='em'] - tag to be used for highlighted parts of the hit
 * @propType {string} [nonHighlightedTagName='span'] - tag to be used for the parts of the hit that are not highlighted
 * @propType {React.Element} [separatorComponent=',<space>'] - symbol used to separate the elements of the array in case the attributeName points to an array of strings.
 * @themeKey ais-Highlight - the root span of the widget
 * @themeKey ais-Highlight-highlighted - the highlighted text
 * @themeKey ais-Highlight-nonHighlighted - the normal text
 * @example
 * import React from 'react';
 *
 * import { connectHits, Highlight, InstantSearch } from 'react-instantsearch/dom';
 *
 * const CustomHits = connectHits(({ hits }) =>
 * <div>
 *   {hits.map(hit =>
 *     <p key={hit.objectID}>
 *       <Highlight attributeName="description" hit={hit} />
 *     </p>
 *   )}
 * </div>
 * );
 *
 * export default function App() {
 *  return (
 *    <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <CustomHits />
 *     </InstantSearch>
 *  );
 * }
 */

const Highlight = connectHighlight(props => (
  <HighlightComponent {...props} cx={cx} />
));

export default Highlight;
