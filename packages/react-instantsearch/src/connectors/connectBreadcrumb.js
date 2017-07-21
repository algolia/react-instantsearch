import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import hierarchicalMenuLogic from './hierarchicalMenuLogic';
import { SearchParameters } from 'algoliasearch-helper';
export const getId = props => props.attributes[0];

function assembleBreadcrumb(items, previous) {
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
}

export default createConnector({
  displayName: 'AlgoliaBreadcrumb',

  propTypes: {
    attributes: (props, propName, componentName) => {
      const isNotString = val => typeof val !== 'string';
      if (
        !Array.isArray(props[propName]) ||
        props[propName].some(isNotString) ||
        props[propName].length < 1
      ) {
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. Expected an Array of Strings`
        );
      }
      return undefined;
    },
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    rootPath: PropTypes.string,
    defaultRefinement: PropTypes.string,
    transformItems: PropTypes.func,
  },

  defaultProps: {
    separator: ' > ',
    rootPath: null,
  },

  getProvidedProps(props, searchState, searchResults) {
    const { items } = hierarchicalMenuLogic.getProvidedProps.call(
      this,
      props,
      searchState,
      searchResults
    );

    const refinedItems = assembleBreadcrumb(items);
    const transformedItems = props.transformItems
      ? props.transformItems(refinedItems)
      : refinedItems;
    return {
      items: transformedItems,
      canRefine: transformedItems.length > 0,
    };
  },

  refine(props, searchState, nextRefinement) {
    //console.log("refine", nextRefinement);
    return hierarchicalMenuLogic.refine.call(
      this,
      props,
      searchState,
      nextRefinement,
      this.context
    );
  },
});
