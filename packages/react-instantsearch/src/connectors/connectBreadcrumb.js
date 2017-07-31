import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import hierarchicalMenuLogic from './hierarchicalMenuLogic';

export const getId = props => props.attributes[0];

function assembleBreadcrumb(items, previous) {
  return !items
    ? []
    : items.reduce((acc, item) => {
        if (item.isRefined) {
          acc.push({
            label: item.label,
            // If dealing with a nested "items", "value" is equal to the previous value concatenated with the current label
            // If dealing with the first level, "value" is equal to the current label
            value: previous
              ? `${previous[previous.length - 1].value} > ${item.label}`
              : item.label,
          });
          // Create a variable in order to keep the same acc for the recursion, otherwise "reduce" returns a new one
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
    rootURL: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    transformItems: PropTypes.func,
  },

  defaultProps: {
    rootURL: null,
    separator: ' > ',
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
      canRefine: transformedItems.length > 0,
      items: transformedItems,
    };
  },

  refine(props, searchState, nextRefinement) {
    return hierarchicalMenuLogic.refine.call(
      this,
      props,
      searchState,
      nextRefinement,
      this.context
    );
  },
});
