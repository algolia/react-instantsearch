import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import connectHierarchicalMenu from './connectHierarchicalMenu';
import { SearchParameters } from 'algoliasearch-helper';
import {
  cleanUpValue,
  getIndex,
  refineValue,
  getCurrentRefinementValue,
  getResults,
} from '../core/indexUtils';
import blop from './blop';

export const getId = props => props.attributes[0];

const namespace = 'hierarchicalMenu';

export default createConnector({
  displayName: 'AlgoliaBreadcrumb',

  getProvidedProps(props, searchState, searchResults) {
    const newProps = blop.getProvidedProps.call(
      this,
      props,
      searchState,
      searchResults
    );
    console.log('newProps', newProps);
    return newProps;
  },

  refine(props, searchState, nextRefinement) {
    return {};
  },

  cleanUp(props, searchState) {
    return {};
  },
  /*
  getSearchParameters(searchParameters, props, searchState) {
    return searchParameters;
  },
  */

  getMetadata(props, searchState) {
    return {};
  },
});
