import createConnector from '../../packages/react-instantsearch/src/core/createConnector';
import { getCurrentRefinementValue } from '../../packages/react-instantsearch/src/core/indexUtils';

const getId = () => 'aroundLatLng';

export default createConnector({
  displayName: 'AlgoliaGeoSearch',

  getProvidedProps() {
    return {};
  },

  refine(props, searchState, nextValue) {
    // eslint-disable-next-line no-unused-vars
    const { boundingBox, ...sliceSearchState } = searchState;

    return {
      ...sliceSearchState,
      aroundLatLng: nextValue,
    };
  },

  getSearchParameters(searchParameters, props, searchState) {
    const currentRefinement = getCurrentRefinementValue(
      props,
      searchState,
      this.context,
      getId()
    );

    return searchParameters
      .setQueryParameter('insideBoundingBox')
      .setQueryParameter(
        'aroundLatLng',
        `${currentRefinement.lat}, ${currentRefinement.lng}`
      );
  },
});
