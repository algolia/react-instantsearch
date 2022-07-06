import React, { useRef, useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';

import { SearchBox as SearchBoxUiComponent } from '../ui/SearchBox';

import type { SearchBoxProps as SearchBoxUiComponentProps } from '../ui/SearchBox';
import type { UseSearchBoxProps } from 'react-instantsearch-hooks';

type UiProps = Pick<
  SearchBoxUiComponentProps,
  | 'inputRef'
  | 'isSearchStalled'
  | 'onChange'
  | 'onReset'
  | 'value'
  | 'translations'
>;

export type SearchBoxProps = Omit<SearchBoxUiComponentProps, keyof UiProps> &
  UseSearchBoxProps;

export function SearchBox({ queryHook, ...props }: SearchBoxProps) {
  const { query, refine, isSearchStalled } = useSearchBox(
    { queryHook },
    { $$widgetType: 'ais.searchBox' }
  );
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  function onReset() {
    setValue('');
    refine('');
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const targetValue = event.currentTarget.value;
    setValue(targetValue);
    refine(targetValue);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== value && document.activeElement !== inputRef.current) {
    setValue(query);
  }

  const uiProps: UiProps = {
    inputRef,
    isSearchStalled,
    onChange,
    onReset,
    value,
    translations: {
      submitTitle: 'Submit the search query.',
      resetTitle: 'Clear the search query.',
    },
  };

  return <SearchBoxUiComponent {...props} {...uiProps} />;
}
