import createConnector from '../core/createConnector';
import {
  cleanUpValue,
  refineValue,
  getCurrentRefinementValue,
  getResults,
} from '../core/indexUtils';

function getId() {
  return 'page';
}

function getCurrentRefinement(props, searchState, context) {
  const id = getId();
  const page = 1;
  const currentRefinement = getCurrentRefinementValue(
    props,
    searchState,
    context,
    id,
    page
  );

  if (typeof currentRefinement === 'string') {
    return parseInt(currentRefinement, 10);
  }
  return currentRefinement;
}

function refine(props, searchState, nextPage, context) {
  const id = getId();
  const nextValue = { [id]: nextPage };
  const resetPage = false;
  return refineValue(searchState, nextValue, context, resetPage);
}

/**
 * connectPagination connector provides the logic to build a widget that will
 * let the user displays hits corresponding to a certain page.
 * @name connectPagination
 * @kind connector
 * @propType {boolean} [showFirst=true] - Display the first page link.
 * @propType {boolean} [showLast=false] - Display the last page link.
 * @propType {boolean} [showPrevious=true] - Display the previous page link.
 * @propType {boolean} [showNext=true] - Display the next page link.
 * @propType {number} [padding=3] - How many page links to display around the current page.
 * @propType {number} [totalPages=Infinity] - Maximum number of pages to display.
 * @providedPropType {function} refine - a function to remove a single filter
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {number} nbPages - the total of existing pages
 * @providedPropType {number} currentRefinement - the page refinement currently applied
 */
export default createConnector({
  displayName: 'AlgoliaPagination',
  $$type: 'ais.pagination',

  getProvidedProps(props, searchState, searchResults) {
    const results = getResults(searchResults, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue,
    });

    if (!results) {
      return null;
    }

    const nbPages = results.nbPages;
    return {
      nbPages,
      currentRefinement: getCurrentRefinement(props, searchState, {
        ais: props.contextValue,
        multiIndexContext: props.indexContextValue,
      }),
      canRefine: nbPages > 1,
    };
  },

  refine(props, searchState, nextPage) {
    return refine(props, searchState, nextPage, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue,
    });
  },

  cleanUp(props, searchState) {
    return cleanUpValue(
      searchState,
      { ais: props.contextValue, multiIndexContext: props.indexContextValue },
      getId()
    );
  },

  getSearchParameters(searchParameters, props, searchState) {
    return searchParameters.setPage(
      getCurrentRefinement(props, searchState, {
        ais: props.contextValue,
        multiIndexContext: props.indexContextValue,
      }) - 1
    );
  },

  getMetadata() {
    return { id: getId() };
  },
});
