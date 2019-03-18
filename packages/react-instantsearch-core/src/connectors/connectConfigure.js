import { omit, difference } from 'lodash';
import createConnector from '../core/createConnector';
import {
  refineValue,
  getIndexId,
  hasMultipleIndices,
} from '../core/indexUtils';

function getId() {
  return 'configure';
}

export default createConnector({
  displayName: 'AlgoliaConfigure',
  getProvidedProps() {
    return {};
  },
  getSearchParameters(searchParameters, props) {
    const items = omit(props, 'children', 'contextValue');
    return searchParameters.setQueryParameters(items);
  },
  transitionState(props, prevSearchState, nextSearchState) {
    const id = getId();
    const items = omit(props, 'children', 'contextValue');
    const nonPresentKeys = this._props
      ? difference(Object.keys(this._props), Object.keys(props))
      : [];
    this._props = props;
    const nextValue = {
      [id]: { ...omit(nextSearchState[id], nonPresentKeys), ...items },
    };
    return refineValue(nextSearchState, nextValue, { ais: props.contextValue });
  },
  cleanUp(props, searchState) {
    const id = getId();
    const indexId = getIndexId({ ais: props.contextValue });

    const subState =
      hasMultipleIndices(props.contextValue) && searchState.indices
        ? searchState.indices[indexId]
        : searchState;

    const configureKeys =
      subState && subState[id] ? Object.keys(subState[id]) : [];

    const configureState = configureKeys.reduce((acc, item) => {
      if (!props[item]) {
        acc[item] = subState[id][item];
      }
      return acc;
    }, {});

    const nextValue = { [id]: configureState };

    return refineValue(searchState, nextValue, { ais: props.contextValue });
  },
});
