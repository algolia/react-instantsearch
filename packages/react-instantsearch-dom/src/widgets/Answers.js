import React, { useState, useEffect, useMemo, useContext } from 'react';
import { instantSearchContext } from 'react-instantsearch-core';
import { createConcurrentSafePromise } from '../lib/createConcurrentSafePromise';
import { debounce } from '../lib/debounce';

/* eslint-disable react/prop-types */
function DefaultAnswersComponent({ isLoading, hits = [] }) {
  return isLoading ? (
    <p>loading...</p>
  ) : (
    hits && hits.length > 0 && <pre>{JSON.stringify(hits, null, 2)}</pre>
  );
}

export default function Answers({
  searchClient,
  queryLanguages,
  attributesForPrediction = ['*'],
  nbHits = 1,
  answersComponent: AnswersComponent = DefaultAnswersComponent,
}) {
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
  useEffect(() => {
    // eslint-disable-next-line no-warning-comments
    // FIXME: remove this customization once the engine accepts url encoded query params
    if (searchClient.transporter) {
      searchClient.transporter.userAgent.value = 'answers-test';
    }
  }, [searchClient]);
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
      }, 200),
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
      searchIndex.findAnswers(_query, queryLanguages, {
        nbHits,
        attributesForPrediction,
      })
    ).then(result => {
      setDebouncedResult(result);
    });
  };

  useEffect(() => {
    fetchAnswers(query);
  }, [query]);

  return <AnswersComponent hits={hits} isLoading={isLoading} />;
}
/* eslint-enable react/prop-types */
