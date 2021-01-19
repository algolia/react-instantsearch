import React, { useState, useEffect, useMemo, useContext } from 'react';
import { instantSearchContext } from 'react-instantsearch-core';
import { createConcurrentSafePromise } from '../lib/createConcurrentSafePromise';
import { debounce, debounceAsync } from '../lib/debounce';

function hasReactHooks() {
  // >= 16.8.0
  const [major, minor] = React.version.split('.').map(Number);
  if (major >= 17) {
    return true;
  }
  if (major === 16 && minor >= 8) {
    return true;
  }
  return false;
}

export default function useAnswers({
  searchClient,
  queryLanguages,
  attributesForPrediction,
  nbHits,
  renderDebounceTime = 100,
  searchDebounceTime = 100,
  ...extraParameters
}) {
  if (!hasReactHooks()) {
    throw new Error(
      `\`Answers\` component and \`useAnswers\` hook require all React packages to be 16.8.0 or higher.`
    );
  }
  const context = useContext(instantSearchContext);
  const [query, setQuery] = useState();
  const [index, setIndex] = useState();
  const [isLoading, setIsLoading] = useState();
  const [hits, setHits] = useState();
  const runConcurrentSafePromise = useMemo(
    () => createConcurrentSafePromise(),
    []
  );
  const searchIndex = useMemo(() => searchClient.initIndex(index), [
    searchClient,
    index,
  ]);
  const debouncedSearch = useMemo(() => {
    if (!searchIndex) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return () => Promise.reject();
    }
    if (!searchIndex.findAnswers) {
      throw new Error(
        '`Answers` component and `useAnswers` hook require `algoliasearch` to be 4.8.0 or higher.'
      );
    }
    return debounceAsync(searchIndex.findAnswers, searchDebounceTime);
  }, [searchIndex]);
  useEffect(() => {
    const unsubcribe = context.store.subscribe(() => {
      const { widgets, results } = context.store.getState();
      setQuery(widgets.query);
      setIndex(results && results.index);
    });
    return unsubcribe;
  }, [context]);
  const setDebouncedResult = useMemo(
    () =>
      debounce(result => {
        setIsLoading(false);
        setHits(result.hits);
      }, renderDebounceTime),
    [setIsLoading, setHits]
  );
  const fetchAnswers = _query => {
    if (!_query) {
      setIsLoading(false);
      setHits([]);
      return;
    }
    setIsLoading(true);
    runConcurrentSafePromise(
      debouncedSearch(_query, queryLanguages, {
        ...extraParameters,
        nbHits,
        attributesForPrediction,
        // eslint-disable-next-line no-warning-comments
        // FIXME: remove this x-algolia-agent once the engine accepts url encoded query params
        queryParameters: {
          'x-algolia-agent': 'answers-test',
        },
      })
    ).then(result => {
      if (!result) {
        // It's undefined when it's debounced.
        return;
      }
      setDebouncedResult(result);
    });
  };

  useEffect(() => {
    fetchAnswers(query);
  }, [query]);

  return { hits, isLoading };
}
