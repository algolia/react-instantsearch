import { has, omit, get } from 'lodash';

export function getIndex(context) {
  return context && context.multiIndexContext
    ? context.multiIndexContext.targetedIndex
    : context.ais.mainTargetedIndex;
}

export function getResults(searchResults, context) {
  if (searchResults.results && !searchResults.results.hits) {
    return searchResults.results[getIndex(context)]
      ? searchResults.results[getIndex(context)]
      : null;
  } else {
    return searchResults.results ? searchResults.results : null;
  }
}

export function hasMultipleIndex(context) {
  return context && context.multiIndexContext;
}

// eslint-disable-next-line max-params
export function refineValue(
  searchState,
  nextRefinement,
  context,
  resetPage,
  namespace
) {
  if (hasMultipleIndex(context)) {
    return namespace
      ? refineMultiIndexWithNamespace(
          searchState,
          nextRefinement,
          context,
          resetPage,
          namespace
        )
      : refineMultiIndex(searchState, nextRefinement, context, resetPage);
  } else {
    return namespace
      ? refineSingleIndexWithNamespace(
          searchState,
          nextRefinement,
          resetPage,
          namespace
        )
      : refineSingleIndex(searchState, nextRefinement, resetPage);
  }
}

function refineMultiIndex(searchState, nextRefinement, context, resetPage) {
  const page = resetPage ? { page: 1 } : undefined;
  const index = getIndex(context);
  const state = has(searchState, `indices.${index}`)
    ? {
        ...searchState.indices,
        [index]: { ...searchState.indices[index], ...nextRefinement, ...page },
      }
    : {
        ...searchState.indices,
        ...{ [index]: { ...nextRefinement, ...page } },
      };
  return { ...searchState, indices: state };
}

function refineSingleIndex(searchState, nextRefinement, resetPage) {
  const page = resetPage ? { page: 1 } : undefined;
  return { ...searchState, ...nextRefinement, ...page };
}

// eslint-disable-next-line max-params
function refineMultiIndexWithNamespace(
  searchState,
  nextRefinement,
  context,
  resetPage,
  namespace
) {
  const index = getIndex(context);
  const page = resetPage ? { page: 1 } : undefined;
  const state = has(searchState, `indices.${index}`)
    ? {
        ...searchState.indices,
        [index]: {
          ...searchState.indices[index],
          ...{
            [namespace]: {
              ...searchState.indices[index][namespace],
              ...nextRefinement,
            },
            page: 1,
          },
        },
      }
    : {
        ...searchState.indices,
        ...{ [index]: { [namespace]: nextRefinement, ...page } },
      };
  return { ...searchState, indices: state };
}

function refineSingleIndexWithNamespace(
  searchState,
  nextRefinement,
  resetPage,
  namespace
) {
  const page = resetPage ? { page: 1 } : undefined;
  return {
    ...searchState,
    [namespace]: { ...searchState[namespace], ...nextRefinement },
    ...page,
  };
}

function getNamespaceAndId(input) {
  const parts = input.match(/^([^.]*)\.(.*)/);
  const namespace = parts && parts[1];
  const id = parts && parts[2];

  return { namespace, id };
}

// eslint-disable-next-line max-params
export function getCurrentRefinementValue(
  props,
  searchState,
  context,
  id,
  defaultValue,
  refinementsCallback
) {
  const index = getIndex(context);
  const namespace = getNamespaceAndId(id);
  const refinements =
    (hasMultipleIndex(context) && has(searchState, `indices.${index}.${id}`)) ||
    (!hasMultipleIndex(context) &&
      namespace.namespace &&
      namespace.id &&
      has(searchState[namespace.namespace], namespace.id)) ||
    (!hasMultipleIndex(context) && has(searchState, id));
  if (refinements) {
    let currentRefinement;

    if (hasMultipleIndex(context)) {
      currentRefinement = get(searchState.indices[index], id);
    } else if (namespace.namespace && namespace.id) {
      currentRefinement = get(searchState[namespace.namespace], namespace.id);
    } else {
      currentRefinement = get(searchState, id);
    }

    return refinementsCallback(currentRefinement);
  }
  if (props.defaultRefinement) {
    return props.defaultRefinement;
  }
  return defaultValue;
}

export function cleanUpValue(searchState, context, id) {
  const index = getIndex(context);
  let namespace;

  if (hasMultipleIndex(context)) {
    return omit(searchState, `indices.${index}.${id}`);
  }

  namespace = getNamespaceAndId(id);
  if (namespace.namespace && namespace.id) {
    return {
      ...searchState,
      [namespace.namespace]: omit(
        searchState[namespace.namespace],
        `${namespace.id}`
      ),
    };
  }

  return omit(searchState, `${id}`);
}
