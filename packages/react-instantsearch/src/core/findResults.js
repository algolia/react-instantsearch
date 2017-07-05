import { findResults } from './createInstantSearchServer';

/** 
 * Useful only for getting parsed by js-doc. 
 * If put inside createInstantSearchServer.js, jsdoc-parse is not able to parse it. 
 * **/

/**
 * The connectSortBy connector provides the logic to build a widget that will
 *  display a list of indices. This allows a user to change how the hits are being sorted.
 * @name findResults
 * @requirements Algolia handles sorting by creating replica indices. [Read more about sorting](https://www.algolia.com/doc/guides/relevance/sorting/) on
 * the Algolia website.
 * @kind server-side-rendering
 * @param {string} App - The default selected index.
 * @param {} params - The list of indexes to search in.
 */
export { findResults };
