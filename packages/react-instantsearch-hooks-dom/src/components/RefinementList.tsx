import React, { useEffect, useRef, useState } from 'react';
import { useRefinementList } from 'react-instantsearch-hooks';

import { RefinementList as RefinementListUiComponent } from '../ui/RefinementList';

import type { RefinementListWidgetParams } from 'instantsearch.js/es/widgets/refinement-list/refinement-list';
import type { UseRefinementListProps } from 'react-instantsearch-hooks';

export type RefinementListProps = React.ComponentProps<'div'> &
  UseRefinementListProps &
  Pick<RefinementListWidgetParams, 'searchable' | 'searchablePlaceholder'>;

export function RefinementList(props: RefinementListProps) {
  const {
    canToggleShowMore,
    isFromSearch,
    isShowingMore,
    items,
    refine,
    searchForItems,
    toggleShowMore,
  } = useRefinementList(props);
  const [query, setQuery] = useState('');
  const previousQueryRef = useRef(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (previousQueryRef.current !== query) {
      previousQueryRef.current = query;
      searchForItems(query);
    }
  }, [query, searchForItems]);

  return (
    <RefinementListUiComponent
      searchable={props.searchable}
      inputRef={inputRef}
      searchablePlaceholder={props.searchablePlaceholder}
      onInputChange={(event) => {
        setQuery(event.currentTarget.value);
      }}
      onReset={() => {
        setQuery('');
      }}
      onSubmit={() => {
        if (items.length > 0) {
          refine(items[0].value);
          setQuery('');
        }
      }}
      query={query}
      isFromSearch={isFromSearch}
      items={items}
      onItemChange={(item) => {
        refine(item.value);
        setQuery('');
      }}
      showMore={props.showMore}
      canToggleShowMore={canToggleShowMore}
      isShowingMore={isShowingMore}
      toggleShowMore={toggleShowMore}
    />
  );
}
