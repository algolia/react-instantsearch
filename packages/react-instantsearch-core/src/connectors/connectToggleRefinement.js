import { find } from 'lodash';
import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import {
  cleanUpValue,
  getIndex,
  getResults,
  refineValue,
  getCurrentRefinementValue,
} from '../core/indexUtils';

function getId(props) {
  return props.attribute;
}

const namespace = 'toggle';

function getCurrentRefinement(props, searchState, context) {
  return getCurrentRefinementValue(
    props,
    searchState,
    context,
    `${namespace}.${getId(props)}`,
    false,
    currentRefinement => {
      if (currentRefinement) {
        return currentRefinement;
      }
      return false;
    }
  );
}

function refine(props, searchState, nextRefinement, context) {
  const id = getId(props);
  const nextValue = { [id]: nextRefinement ? nextRefinement : false };
  const resetPage = true;
  return refineValue(searchState, nextValue, context, resetPage, namespace);
}

function cleanUp(props, searchState, context) {
  return cleanUpValue(searchState, context, `${namespace}.${getId(props)}`);
}

/**
 * connectToggleRefinement connector provides the logic to build a widget that will
 * provides an on/off filtering feature based on an attribute value.
 * @name connectToggleRefinement
 * @kind connector
 * @requirements To use this widget, you'll need an attribute to toggle on.
 *
 * You can't toggle on null or not-null values. If you want to address this particular use-case you'll need to compute an
 * extra boolean attribute saying if the value exists or not. See this [thread](https://discourse.algolia.com/t/how-to-create-a-toggle-for-the-absence-of-a-string-attribute/2460) for more details.
 *
 * @propType {string} attribute - Name of the attribute on which to apply the `value` refinement. Required when `value` is present.
 * @propType {string} label - Label for the toggle.
 * @propType {string} value - Value of the refinement to apply on `attribute`.
 * @propType {boolean} [defaultRefinement=false] - Default searchState of the widget. Should the toggle be checked by default?
 * @providedPropType {boolean} currentRefinement - `true` when the refinement is applied, `false` otherwise
 * @providedPropType {object} count - an object that contains the count for `checked` and `unchecked` state
 * @providedPropType {function} refine - a function to toggle a refinement
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 */
export default createConnector({
  displayName: 'AlgoliaToggle',

  propTypes: {
    label: PropTypes.string.isRequired,
    attribute: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    filter: PropTypes.func,
    defaultRefinement: PropTypes.bool,
  },

  getProvidedProps(props, searchState, searchResults) {
    const { attribute, value } = props;
    const results = getResults(searchResults, this.context);
    const currentRefinement = getCurrentRefinement(
      props,
      searchState,
      this.context
    );

    const allFacetValues = results && results.getFacetValues(attribute);
    const facetValue =
      // Use null to always be consistent with type of the value
      // count: number | null
      allFacetValues && allFacetValues.length
        ? find(allFacetValues, item => item.name === value.toString())
        : null;

    const facetValueCount = facetValue && facetValue.count;
    const allFacetValuesCount =
      // Use null to always be consistent with type of the value
      // count: number | null
      allFacetValues && allFacetValues.length
        ? allFacetValues.reduce((acc, item) => acc + item.count, 0)
        : null;

    const count = {
      checked: allFacetValuesCount,
      unchecked: facetValueCount,
    };

    return {
      canRefine: facetValueCount !== null && facetValueCount > 0,
      currentRefinement,
      count,
    };
  },

  refine(props, searchState, nextRefinement) {
    return refine(props, searchState, nextRefinement, this.context);
  },

  cleanUp(props, searchState) {
    return cleanUp(props, searchState, this.context);
  },

  getSearchParameters(searchParameters, props, searchState) {
    const { attribute, value, filter } = props;
    const checked = getCurrentRefinement(props, searchState, this.context);

    let nextSearchParameters = searchParameters.addDisjunctiveFacet(attribute);

    if (checked) {
      nextSearchParameters = nextSearchParameters.addDisjunctiveFacetRefinement(
        attribute,
        value
      );

      if (filter) {
        nextSearchParameters = filter(nextSearchParameters);
      }
    }

    return nextSearchParameters;
  },

  getMetadata(props, searchState) {
    const id = getId(props);
    const checked = getCurrentRefinement(props, searchState, this.context);
    const items = [];
    const index = getIndex(this.context);

    if (checked) {
      items.push({
        label: props.label,
        currentRefinement: checked,
        attribute: props.attribute,
        value: nextState => refine(props, nextState, false, this.context),
      });
    }

    return { id, index, items };
  },
});
