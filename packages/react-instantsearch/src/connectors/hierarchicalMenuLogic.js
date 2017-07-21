import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import { SearchParameters } from 'algoliasearch-helper';
import {
  cleanUpValue,
  getIndex,
  refineValue,
  getCurrentRefinementValue,
  getResults,
} from '../core/indexUtils';

export const getId = props => props.attributes[0];

const namespace = 'hierarchicalMenu';

function getCurrentRefinement(props, searchState, context) {
  return getCurrentRefinementValue(
    props,
    searchState,
    context,
    `${namespace}.${getId(props)}`,
    null,
    currentRefinement => {
      if (currentRefinement === '') {
        return null;
      }
      return currentRefinement;
    }
  );
}

function getValue(path, props, searchState, context) {
  const { id, attributes, separator, rootPath, showParentLevel } = props;

  const currentRefinement = getCurrentRefinement(props, searchState, context);
  let nextRefinement;

  if (currentRefinement === null) {
    nextRefinement = path;
  } else {
    const tmpSearchParameters = new SearchParameters({
      hierarchicalFacets: [
        {
          name: id,
          attributes,
          separator,
          rootPath,
          showParentLevel,
        },
      ],
    });

    nextRefinement = tmpSearchParameters
      .toggleHierarchicalFacetRefinement(id, currentRefinement)
      .toggleHierarchicalFacetRefinement(id, path)
      .getHierarchicalRefinement(id)[0];
  }

  return nextRefinement;
}

function transformValue(value, limit, props, searchState, context) {
  return value.slice(0, limit).map(v => ({
    label: v.name,
    value: getValue(v.path, props, searchState, context),
    count: v.count,
    isRefined: v.isRefined,
    items: v.data && transformValue(v.data, limit, props, searchState, context),
  }));
}

function refine(props, searchState, nextRefinement, context) {
  const id = getId(props);
  const nextValue = { [id]: nextRefinement || '' };
  const resetPage = true;
  return refineValue(searchState, nextValue, context, resetPage, namespace);
}

function cleanUp(props, searchState, context) {
  return cleanUpValue(searchState, context, `${namespace}.${getId(props)}`);
}

const sortBy = ['name:asc'];

export default {
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
    separator: PropTypes.string,
    rootPath: PropTypes.string,
    showParentLevel: PropTypes.bool,
    defaultRefinement: PropTypes.string,
    showMore: PropTypes.bool,
    limitMin: PropTypes.number,
    limitMax: PropTypes.number,
    transformItems: PropTypes.func,
  },

  defaultProps: {
    showMore: false,
    limitMin: 10,
    limitMax: 20,
    separator: ' > ',
    rootPath: null,
    showParentLevel: true,
  },

  getProvidedProps(props, searchState, searchResults) {
    const { showMore, limitMin, limitMax } = props;
    const id = getId(props);
    const results = getResults(searchResults, this.context);

    const isFacetPresent =
      Boolean(results) && Boolean(results.getFacetByName(id));

    if (!isFacetPresent) {
      return {
        items: [],
        currentRefinement: getCurrentRefinement(
          props,
          searchState,
          this.context
        ),
        canRefine: false,
      };
    }

    const limit = showMore ? limitMax : limitMin;
    const value = results.getFacetValues(id, { sortBy });
    const items = value.data
      ? transformValue(value.data, limit, props, searchState, this.context)
      : [];

    return {
      items,
      currentRefinement: getCurrentRefinement(props, searchState, this.context),
      canRefine: items.length > 0,
    };
  },

  refine(props, searchState, nextRefinement) {
    return refine(props, searchState, nextRefinement, this.context);
  },

  cleanUp(props, searchState) {
    return cleanUp(props, searchState, this.context);
  },

  getSearchParameters(searchParameters, props, searchState) {
    const {
      attributes,
      separator,
      rootPath,
      showParentLevel,
      showMore,
      limitMin,
      limitMax,
    } = props;

    const id = getId(props);
    const limit = showMore ? limitMax : limitMin;

    searchParameters = searchParameters
      .addHierarchicalFacet({
        name: id,
        attributes,
        separator,
        rootPath,
        showParentLevel,
      })
      .setQueryParameters({
        maxValuesPerFacet: Math.max(
          searchParameters.maxValuesPerFacet || 0,
          limit
        ),
      });

    const currentRefinement = getCurrentRefinement(
      props,
      searchState,
      this.context
    );
    if (currentRefinement !== null) {
      searchParameters = searchParameters.toggleHierarchicalFacetRefinement(
        id,
        currentRefinement
      );
    }

    return searchParameters;
  },

  getMetadata(props, searchState) {
    const rootAttribute = props.attributes[0];
    const id = getId(props);
    const currentRefinement = getCurrentRefinement(
      props,
      searchState,
      this.context
    );

    return {
      id,
      index: getIndex(this.context),
      items: !currentRefinement
        ? []
        : [
            {
              label: `${rootAttribute}: ${currentRefinement}`,
              attributeName: rootAttribute,
              value: nextState => refine(props, nextState, '', this.context),
              currentRefinement,
            },
          ],
    };
  },
};
