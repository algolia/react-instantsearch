import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';

const getId = () => 'geoSearch';

const toggleRefineOnMapMove = update => () =>
  update(prevUiState => ({
    isRefineOnMapMove: !prevUiState.isRefineOnMapMove,
  }));

const setMapMoveSinceLastRefine = update => value =>
  update(prevUiState => {
    const { hasMapMoveSinceLastRefine } = prevUiState;

    // Prevent useless rendering, only render the first
    // time we change the value. It will avoid to run
    // the render on each move.
    if (hasMapMoveSinceLastRefine === value) {
      return null;
    }

    return {
      hasMapMoveSinceLastRefine: value,
    };
  });

export default createConnector({
  displayName: 'AlgoliaGeoSearch',

  propTypes: {
    enableRefineOnMapMove: PropTypes.bool,
  },

  defaultProps: {
    enableRefineOnMapMove: true,
  },

  initialUiState: ({ enableRefineOnMapMove }) => ({
    isRefineOnMapMove: enableRefineOnMapMove,
    hasMapMoveSinceLastRefine: false,
  }),

  getProvidedProps({ searchResults, searchState, uiState }) {
    // @TODO: Handle multi-index
    const results = searchResults.results;
    const { state: uiStateValue, update: setUiState } = uiState;
    const searchParameters = results && results._state;
    const isRefinedWithMapFromSearchState = Boolean(searchState[getId()]);
    const isRefinedWithMapFromSearchParameters =
      searchParameters && Boolean(searchParameters.insideBoundingBox);
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
      // position: null // fetch from somewhere
      items: results ? results.hits.filter(_ => Boolean(_._geoloc)) : [],
      isRefineOnMapMove: uiStateValue.isRefineOnMapMove,
      toggleRefineOnMapMove: toggleRefineOnMapMove(setUiState),
      hasMapMoveSinceLastRefine: uiStateValue.hasMapMoveSinceLastRefine,
      setMapMoveSinceLastRefine: setMapMoveSinceLastRefine(setUiState),
      isRefinedWithMap,
    };
  },

  refine({ searchState, nextRefinement }) {
    // refine({ searchState, nextRefinement, setUiState }) {
    // @TODO: Handle multi-index
    const { northEast: ne, southWest: sw } = nextRefinement || {};
    const boundingBox = ne && sw ? [ne.lat, ne.lng, sw.lat, sw.lng].join() : '';

    // setUiState(() => ({
    //   hasMapMoveSinceLastRefine: false,
    //   isRefinedWithMap: !reset,
    // }));

    return {
      ...searchState,
      [getId()]: boundingBox,
    };
  },

  getSearchParameters(searchParameters, props, searchState) {
    // @TODO: Handle position & IP
    // @TODO: Handle multi-index
    const bbox = searchState[getId()];

    if (!bbox) {
      return searchParameters.setQueryParameter('aroundLatLngViaIP', true);
    }

    return searchParameters.setQueryParameter('insideBoundingBox', bbox);
  },

  cleanUp(props, searchState) {
    // @TODO: implement
    return searchState;
  },

  getMetadata() {
    // @TODO: implement
    return {
      items: [],
    };
  },
});
