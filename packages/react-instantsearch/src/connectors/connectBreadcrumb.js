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

    const arrayTest = [
      {
        count: 319,
        isRefined: false,
        items: null,
        label: 'Bathroom',
        value: 'Bathroom',
      },
      {
        count: 143,
        isRefined: true,
        items: [
          {
            count: 43,
            isRefined: false,
            items: null,
            label: 'Bakeware',
            value: 'Cooking > Bakeware',
          },
          {
            count: 18,
            isRefined: true,
            items: null,
            label: 'Diswashing accessories',
            value: 'Cooking',
          },
          {
            count: 82,
            isRefined: false,
            items: null,
            label: 'Food storage & organizing',
            value: 'Cooking > Food storage & organizing',
          },
        ],
        label: 'Cooking',
        value: undefined,
      },
      {
        count: 880,
        isRefined: false,
        items: null,
        label: 'Decoration',
        value: 'Decoration',
      },
    ];
    // console.log("Array test", assembleBreadcrumb(arrayTest));
    // console.log("New props", newProps);
    // console.log("test", assembleBreadcrumb(newProps.items));

    return { items: assembleBreadcrumb(newProps.items) };
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
