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
import { filter } from 'lodash';
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

    const assembleBreadcrumb = (items, previous) => {
      return !items
        ? []
        : items.reduce((acc, item) => {
            if (item.isRefined) {
              acc.push({
                label: item.label,
                // If it's a nested "items", "value" is equal to the previous value concatenated with the current label
                // If it's the first level, it is equal to the current label
                value: previous
                  ? `${previous[previous.length - 1].value} > ${item.label}`
                  : item.label,
              });
              // Create a variable in order to keep the same acc for the recursion, otherwise reduce returns a new one
              acc = acc.concat(assembleBreadcrumb(item.items, acc));
            }
            return acc;
          }, []);
    };
    return { items: assembleBreadcrumb(newProps.items) };
  },

  refine(props, searchState, nextRefinement) {
    console.log('refine', nextRefinement);
    return blop.refine(props, searchState, nextRefinement, this.context);
  },

  cleanUp(props, searchState) {
    return {};
  },

  getSearchParameters(searchParameters, props, searchState) {
    return searchParameters;
  },

  getMetadata(props, searchState) {
    return {};
  },
});
