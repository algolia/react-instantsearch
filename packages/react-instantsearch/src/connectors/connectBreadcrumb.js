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

    var assembleBreadcrumb = function(items) {
      return items === null
        ? []
        : items.reduce(function(acc, item) {
            if (item.isRefined === true) {
              acc.push({
                label: item.label,
                value: item.value,
                count: item.count,
              });
              acc = acc.concat(assembleBreadcrumb(item.items));
            }
            return acc;
          }, []);
    };

    console.log('Recursion Result', assembleBreadcrumb(newProps.items));
    return assembleBreadcrumb(newProps.items);
  },

  refine(props, searchState, nextRefinement) {
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
