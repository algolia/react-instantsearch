import createConnector from '../core/createConnector';
import {
  getResults,
  getCurrentRefinementValue,
  refineValue,
} from '../core/indexUtils';

const getBoundingBoxId = () => 'boundingBox';

// To control the map with an external widget the other widget
// must write the value in the attribute `aroundLatLng`
const getAroundLatLngId = () => 'aroundLatLng';

const getCurrentRefinement = (props, searchState, context) =>
  getCurrentRefinementValue(
    props,
    searchState,
    context,
    getBoundingBoxId(),
    null,
    x => x
  );

const getCurrentPosition = (props, searchState, context) =>
  getCurrentRefinementValue(
    props,
    searchState,
    context,
    getAroundLatLngId(),
    null,
    x => x
  );

export default createConnector({
  displayName: 'AlgoliaGeoSearch',

  getProvidedProps(props, searchState, searchResults) {
    const results = getResults(searchResults, this.context);
    const currentRefinement = getCurrentRefinement(
      props,
      searchState,
      this.context
    );

    const isRefinedWithMapFromSearchState = Boolean(currentRefinement);
    const isRefinedWithMapFromSearchParameters = Boolean(
      results && results._state.insideBoundingBox
    );

    const isRefinedWithMap =
      // We read it from both becuase the SearchParameters & the searchState are not always
      // in sync. When we set the refinement the searchState is used when we clear the refinement
      // the SearchParameters is used. In the first case when we render the results are not there
      // so we can't find the value from the results. The most up to date value is the searchState.
      // But whren we clear the refinement the searchState is immediatly clear even when the items
      // retrieve are still the one from the previous query with the bounding box. It leads to some
      // issue with fitBounds.
      isRefinedWithMapFromSearchState || isRefinedWithMapFromSearchParameters;

    return {
      hits: !results ? [] : results.hits.filter(_ => Boolean(_._geoloc)),
      position: getCurrentPosition(props, searchState, this.context),
      currentRefinement,
      isRefinedWithMap,
    };
  },

  refine(props, searchState, nextValue) {
    const resetPage = true;
    const nextRefinement = {
      [getBoundingBoxId()]: nextValue,
    };

    return refineValue(searchState, nextRefinement, this.context, resetPage);
  },
});
