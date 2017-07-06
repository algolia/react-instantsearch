/** 
 * Useful only for getting parsed by js-doc. 
 * If put inside createInstantSearchServer.js (where findResultsState can be found),
 *  jsdoc-parse is not able to parse it. 
 * **/

/* eslint valid-jsdoc: 0 */
/**
 * The `findResultsState` function provides a way to retrieve a `resultsState` given an [`<InstantSearch/>`](widgets/InstantSearch.html) 
 * application. It can then be passed as a prop of an [`<InstantSearch/>`](widgets/InstantSearch.html) instance. 
 * @name findResultsState
 * @kind server-side-rendering
 * @param {Component} App - An application instance that contains an `<InstantSearch/>` component. 
 * @param {object} params - A list of props to apply to an `<InstantSearch/>` component. Commonly use to pass a `searchState` such as {searchState: {query: 'chair'}}
 * @returns {SearchResults|SearchResults[]} - returns a SearchResults or an array of SearchResults. 
 */
export function findResultsState() {}

/* eslint valid-jsdoc: 0 */
/**
 * The `createInstantSearch` let's you create a Server-side `<InstantSearch>` and retrieve a `findResultsState` function. 
 * @name createInstantSearch
 * @kind server-side-rendering
 * @returns {{InstantSearch: Component, findResultsState: function}} - returns an `<InstantSearch/>` component and a function that can retrieve the first results of an `<InstantSearch>` app. . 
*/
export function createInstantSearch() {}
