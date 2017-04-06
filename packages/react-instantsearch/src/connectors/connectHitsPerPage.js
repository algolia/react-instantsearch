import { PropTypes } from 'react';
import createConnector from '../core/createConnector';
import {
  cleanUpValue,
  refineValue,
  getCurrentRefinementValue,
} from '../core/indexUtils';

function getId() {
  return 'hitsPerPage';
}

function getCurrentRefinement(props, searchState, context) {
  const id = getId();
  return getCurrentRefinementValue(
    props,
    searchState,
    context,
    id,
    null,
    currentRefinement => {
      if (typeof currentRefinement === 'string') {
        return parseInt(currentRefinement, 10);
      }
      return currentRefinement;
    }
  );
}

/**
 * connectHitsPerPage connector provides the logic to create connected
 * components that will allow a user to choose to display more or less results from Algolia.
 * @name connectHitsPerPage
 * @kind connector
 * @propType {number} defaultRefinement - The number of items selected by default
 * @propType {{value: number, label: string}[]} [items] - List of hits per page options.
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @providedPropType {function} refine - a function to remove a single filter
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {string} currentRefinement - the refinement currently applied
 * @providedPropType {array.<{isRefined: boolean, label?: string, value: number}>} items - the list of items the HitsPerPage can display. If no label provided, the value will be displayed.
 */
export default createConnector({
  displayName: 'AlgoliaHitsPerPage',

  propTypes: {
    defaultRefinement: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
      })
    ),
    transformItems: PropTypes.func,
  },
  
  defaultProps: {
    items: [],
  },

  getProvidedProps(props, searchState) {
    const currentRefinement = getCurrentRefinement(
      props,
      searchState,
      this.context
    );
    const items = props.items.map(
      item =>
        item.value === currentRefinement
          ? { ...item, isRefined: true }
          : { ...item, isRefined: false }
    );
    return {
      items: props.transformItems ? props.transformItems(items) : items,
      currentRefinement,
    };
  },

  refine(props, searchState, nextRefinement) {
    const id = getId();
    const nextValue = { [id]: nextRefinement };
    const resetPage = true;
    return refineValue(searchState, nextValue, this.context, resetPage);
  },

  cleanUp(props, searchState) {
    return cleanUpValue(searchState, this.context, getId());
  },

  getSearchParameters(searchParameters, props, searchState) {
    return searchParameters.setHitsPerPage(
      getCurrentRefinement(props, searchState, this.context)
    );
  },

  getMetadata() {
    return { id: getId() };
  },
});
