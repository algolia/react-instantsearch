import PropTypes from 'prop-types';
import { isFinite as _isFinite } from 'lodash';
import {
  cleanUpValue,
  getIndex,
  refineValue,
  getCurrentRefinementValue,
  getResults,
} from '../core/indexUtils';

import createConnector from '../core/createConnector';

/**
 * connectRange connector provides the logic to create connected
 * components that will give the ability for a user to refine results using
 * a numeric range.
 * @name connectRange
 * @kind connector
 * @requirements The attribute passed to the `attributeName` prop must be holding numerical values.
 * @propType {string} attributeName - Name of the attribute for faceting
 * @propType {{min: number, max: number}} [defaultRefinement] - Default searchState of the widget containing the start and the end of the range.
 * @propType {number} [min] - Minimum value. When this isn't set, the minimum value will be automatically computed by Algolia using the data in the index.
 * @propType {number} [max] - Maximum value. When this isn't set, the maximum value will be automatically computed by Algolia using the data in the index.
 * @providedPropType {function} refine - a function to select a range.
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {string} currentRefinement - the refinement currently applied
 */

function getId(props) {
  return props.attributeName;
}

const namespace = 'range';

function getCurrentRange(boundaries, stats) {
  let min;
  if (_isFinite(boundaries.min)) {
    min = boundaries.min;
  } else if (_isFinite(stats.min)) {
    min = stats.min;
  } else {
    min = undefined;
  }

  let max;
  if (_isFinite(boundaries.max)) {
    max = boundaries.max;
  } else if (_isFinite(stats.max)) {
    max = stats.max;
  } else {
    max = undefined;
  }

  return {
    min,
    max,
  };
}

function getCurrentRefinement(props, searchState, context) {
  const refinement = getCurrentRefinementValue(
    props,
    searchState,
    context,
    `${namespace}.${getId(props)}`,
    {},
    currentRefinement => {
      let { min, max } = currentRefinement;
      if (typeof min === 'string') {
        min = parseInt(min, 10);
      }
      if (typeof max === 'string') {
        max = parseInt(max, 10);
      }
      return { min, max };
    }
  );

  if (props.min !== undefined && refinement.min === undefined) {
    refinement.min = props.min;
  }

  if (props.max !== undefined && refinement.max === undefined) {
    refinement.max = props.max;
  }

  return refinement;
}

function refine(props, searchState, nextRefinement, currentRange, context) {
  const { min: nextMin, max: nextMax } = nextRefinement;
  const { min: currentMinRange, max: currentMaxRange } = currentRange;

  const isResetMin = nextMin === undefined || nextMin === '';
  const isResetMax = nextMax === undefined || nextMax === '';

  const nextMinAsNumber = !isResetMin ? parseFloat(nextMin) : undefined;
  const nextMaxAsNumber = !isResetMax ? parseFloat(nextMax) : undefined;

  const hasMinBound = props.min !== undefined;
  const hasMaxBound = props.max !== undefined;

  let newNextMin;
  if (!hasMinBound && currentMinRange === nextMinAsNumber) {
    newNextMin = undefined;
  } else if (hasMinBound && isResetMin) {
    newNextMin = currentMinRange;
  } else {
    newNextMin = nextMinAsNumber;
  }

  let newNextMax;
  if (!hasMaxBound && currentMaxRange === nextMaxAsNumber) {
    newNextMax = undefined;
  } else if (hasMaxBound && isResetMax) {
    newNextMax = currentMaxRange;
  } else {
    newNextMax = nextMaxAsNumber;
  }

  const isResetNewNextMin = newNextMin === undefined;
  const isValidNewNextMin = _isFinite(newNextMin);
  const isGreatherThanCurrentRange = currentMinRange <= newNextMin;
  const isMinValid =
    isResetNewNextMin || (isValidNewNextMin && isGreatherThanCurrentRange);

  const isResetNewNextMax = newNextMax === undefined;
  const isValidNewNextMax = _isFinite(newNextMax);
  const isLowerThanCurrentRange = currentMaxRange >= newNextMax;
  const isMaxValid =
    isResetNewNextMax || (isValidNewNextMax && isLowerThanCurrentRange);

  if (
    (!isMinValid && !isValidNewNextMin) ||
    (!isMaxValid && !isValidNewNextMax)
  ) {
    throw Error("You can't provide non finite values to the range connector.");
  }

  if (!isMinValid && !isGreatherThanCurrentRange) {
    throw Error("You can't provide min value lower than range.");
  }

  if (!isMaxValid && !isLowerThanCurrentRange) {
    throw Error("You can't provide max value greater than range.");
  }

  const id = getId(props);
  const resetPage = true;
  const nextValue = {
    [id]: {
      min: newNextMin,
      max: newNextMax,
    },
  };

  return refineValue(searchState, nextValue, context, resetPage, namespace);
}

function cleanUp(props, searchState, context) {
  return cleanUpValue(searchState, context, `${namespace}.${getId(props)}`);
}

export default createConnector({
  displayName: 'AlgoliaRange',

  propTypes: {
    id: PropTypes.string,
    attributeName: PropTypes.string.isRequired,
    defaultRefinement: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }),
    min: PropTypes.number,
    max: PropTypes.number,
  },

  getProvidedProps(props, searchState, searchResults) {
    const { attributeName, min: minBound, max: maxBound } = props;
    const results = getResults(searchResults, this.context);
    const stats = results ? results.getFacetStats(attributeName) || {} : {};
    const count = results
      ? results.getFacetValues(attributeName).map(v => ({
          value: v.name,
          count: v.count,
        }))
      : [];

    const { min: rangeMin, max: rangeMax } = getCurrentRange(
      { min: minBound, max: maxBound },
      stats
    );

    const { min: valueMin, max: valueMax } = getCurrentRefinement(
      props,
      searchState,
      this.context
    );

    // The searchState is not always in sync with the helper state. For example
    // when we set boundaries on the first render the searchState don't have
    // the correct refinement. If this behaviour change in the upcoming version
    // we could store the range inside the searchState instead of rely on `this`.
    this._currentRange = {
      min: rangeMin,
      max: rangeMax,
    };

    return {
      min: rangeMin,
      max: rangeMax,
      canRefine: count.length > 0,
      currentRefinement: {
        min: valueMin === undefined ? rangeMin : valueMin,
        max: valueMax === undefined ? rangeMax : valueMax,
      },
      count,
    };
  },

  refine(props, searchState, nextRefinement) {
    return refine(
      props,
      searchState,
      nextRefinement,
      this._currentRange,
      this.context
    );
  },

  cleanUp(props, searchState) {
    return cleanUp(props, searchState, this.context);
  },

  getSearchParameters(params, props, searchState) {
    const { attributeName } = props;
    const currentRefinement = getCurrentRefinement(
      props,
      searchState,
      this.context
    );
    params = params.addDisjunctiveFacet(attributeName);

    const { min, max } = currentRefinement;
    if (typeof min !== 'undefined') {
      params = params.addNumericRefinement(attributeName, '>=', min);
    }
    if (typeof max !== 'undefined') {
      params = params.addNumericRefinement(attributeName, '<=', max);
    }

    return params;
  },

  getMetadata(props, searchState) {
    const { min: minRange, max: maxRange } = this._currentRange;
    const { min: minValue, max: maxValue } = getCurrentRefinement(
      props,
      searchState,
      this.context
    );

    const items = [];
    const hasMin = minValue !== undefined;
    const hasMax = maxValue !== undefined;
    const shouldDisplayMinLabel = hasMin && minValue !== minRange;
    const shouldDisplayMaxLabel = hasMax && maxValue !== maxRange;

    if (shouldDisplayMinLabel || shouldDisplayMaxLabel) {
      const fragments = [
        hasMin ? `${minValue} <= ` : '',
        props.attributeName,
        hasMax ? ` <= ${maxValue}` : '',
      ];

      items.push({
        label: fragments.join(''),
        attributeName: props.attributeName,
        value: nextState => cleanUp(props, nextState, this.context),
        currentRefinement: {
          min: minValue,
          max: maxValue,
        },
      });
    }

    return {
      id: getId(props),
      index: getIndex(this.context),
      items,
    };
  },
});
