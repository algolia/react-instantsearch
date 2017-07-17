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

    const assembleBreadcrumb = function(items, previous) {
      return !items
        ? []
        : items.reduce(function(acc, item) {
            if (item.isRefined === true) {
              acc.push({
                label: item.label,
                value: previous
                  ? `${previous[previous.length - 1].value} > ${item.label}`
                  : item.label,
              });
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
