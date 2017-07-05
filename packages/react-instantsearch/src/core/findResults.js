/** 
 * Useful only for getting parsed by js-doc. 
 * If put inside createInstantSearchServer.js (where findResults can be found),
 *  jsdoc-parse is not able to parse it. 
 * **/

/* eslint valid-jsdoc: 0 */
/**
 * The `findResults` function provides a way to retrieve a `resultsState` given an [`<InstantSearch/>`](widgets/InstantSearch.html) 
 * application. It can then be passed as a prop of an [`<InstantSearch/>`](widgets/InstantSearch.html) instance. 
 * @name findResults
 * @kind server-side-rendering
 * @param {function} App - An application instance that contains an <InstantSearch/> app. 
 * @param {object} params - A list of props to apply to an <InstantSearch/> instance. Commonly use to pass a `searchState` such as {searchState: {}}
 */
export function findResults() {}
