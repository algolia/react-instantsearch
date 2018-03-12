import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';

const getId = () => 'geoSearch';

const toggleRefineOnMapMove = update => () =>
  update(prevProps => ({
    isRefineOnMapMove: !prevProps.isRefineOnMapMove,
  }));

const setMapMoveSinceLastRefine = update => () =>
  update(() => ({
    hasMapMoveSinceLastRefine: true,
  }));

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

  getProvidedProps({ searchState, searchResults, setUiState }) {
    // @TODO: Handle multi-index
    const results = searchResults.results;

    return {
      // position: null // fetch from somewhere
      items: results ? results.hits.filter(_ => Boolean(_._geoloc)) : [],
      isRefinedWithMap: Boolean(searchState[getId()]),
      toggleRefineOnMapMove: toggleRefineOnMapMove(setUiState),
      setMapMoveSinceLastRefine: setMapMoveSinceLastRefine(setUiState),
    };
  },

  refine({ searchState, nextRefinement, setUiState }) {
    // @TODO: Handle multi-index
    const { bounds = {}, reset = true } = nextRefinement || {};
    const { northEast: ne, southWest: sw } = bounds;
    const boundingBox = ne && sw ? [ne.lat, ne.lng, sw.lat, sw.lng].join() : '';

    setUiState(() => ({
      hasMapMoveSinceLastRefine: false,
      isRefinedWithMap: !reset,
    }));

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
