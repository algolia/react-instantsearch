import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import hierarchicalMenuLogic from './hierarchicalMenuLogic';

export const getId = props => props.attributes[0];

/**
 * connectHierarchicalMenu connector provides the logic to build a widget that will
 * give the user the ability to explore a tree-like structure.
 * This is commonly used for multi-level categorization of products on e-commerce
 * websites. From a UX point of view, we suggest not displaying more than two levels deep.
 * @name connectHierarchicalMenu
 * @requirements To use this widget, your attributes must be formatted in a specific way.
 * If you want for example to have a hiearchical menu of categories, objects in your index
 * should be formatted this way:
 *
 * ```json
 * {
 *   "categories.lvl0": "products",
 *   "categories.lvl1": "products > fruits",
 *   "categories.lvl2": "products > fruits > citrus"
 * }
 * ```
 *
 * It's also possible to provide more than one path for each level:
 *
 * ```json
 * {
 *   "categories.lvl0": ["products", "goods"],
 *   "categories.lvl1": ["products > fruits", "goods > to eat"]
 * }
 * ```
 *
 * All attributes passed to the `attributes` prop must be present in "attributes for faceting"
 * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
 *
 * @kind connector
 * @propType {string} attributes - List of attributes to use to generate the hierarchy of the menu. See the example for the convention to follow.
 * @propType {string} [defaultRefinement] - the item value selected by default
 * @propType {boolean} [showMore=false] - Flag to activate the show more button, for toggling the number of items between limitMin and limitMax.
 * @propType {number} [limitMin=10] -  The maximum number of items displayed.
 * @propType {number} [limitMax=20] -  The maximum number of items displayed when the user triggers the show more. Not considered if `showMore` is false.
 * @propType {string} [separator='>'] -  Specifies the level separator used in the data.
 * @propType {string[]} [rootPath=null] - The already selected and hidden path.
 * @propType {boolean} [showParentLevel=true] - Flag to set if the parent level should be displayed.
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @providedPropType {function} refine - a function to toggle a refinement
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {string} currentRefinement - the refinement currently applied
 * @providedPropType {array.<{items: object, count: number, isRefined: boolean, label: string, value: string}>} items - the list of items the HierarchicalMenu can display. items has the same shape as parent items.
 */
export default createConnector({
  displayName: 'AlgoliaHierarchicalMenu',

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
    defaultRefinement: PropTypes.string,
    limitMin: PropTypes.number,
    limitMax: PropTypes.number,
    rootPath: PropTypes.string,
    separator: PropTypes.string,
    showMore: PropTypes.bool,
    showParentLevel: PropTypes.bool,
    transformItems: PropTypes.func,
  },

  defaultProps: {
    limitMin: 10,
    limitMax: 20,
    rootPath: null,
    separator: ' > ',
    showMore: false,
    showParentLevel: true,
  },

  getProvidedProps(props, searchState, searchResults) {
    const providedProps = hierarchicalMenuLogic.getProvidedProps.call(
      this,
      props,
      searchState,
      searchResults
    );

    const items = props.transformItems
      ? props.transformItems(providedProps.items)
      : providedProps.items;

    return { ...providedProps, items };
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

  cleanUp(props, searchState) {
    return hierarchicalMenuLogic.cleanUp.call(
      this,
      props,
      searchState,
      this.context
    );
  },

  getSearchParameters(searchParameters, props, searchState) {
    return hierarchicalMenuLogic.getSearchParameters.call(
      this,
      searchParameters,
      props,
      searchState
    );
  },

  getMetadata(props, searchState) {
    return hierarchicalMenuLogic.getMetadata.call(this, props, searchState);
  },
});
