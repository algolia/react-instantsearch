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
  | 'onSubmit'
  | 'value'
  | 'translations'
>;

export type SearchBoxProps = Omit<
  SearchBoxUiComponentProps,
  Exclude<keyof UiProps, 'onSubmit'>
> &
  UseSearchBoxProps & {
    /**
     * If false, triggers the search only on submit.
     * @type {boolean}
     * @default true
     * @optional
     */
    searchAsYouType?: boolean;
  };

export function SearchBox({
  queryHook,
  searchAsYouType = true,
  ...props
}: SearchBoxProps) {
  const { query, refine, isSearchStalled } = useSearchBox(
    { queryHook },
    { $$widgetType: 'ais.searchBox' }
  );
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    if (searchAsYouType) {
      refine(newQuery);
    }
  }

  function onReset() {
    setQuery('');
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (props.onSubmit) {
      props.onSubmit(event);
    } else if (!searchAsYouType) {
      refine(inputValue);
    }
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && document.activeElement !== inputRef.current) {
    setInputValue(query);
  }

  const uiProps: UiProps = {
    inputRef,
    isSearchStalled,
    onChange,
    onReset,
    onSubmit,
    value: inputValue,
    translations: {
      submitTitle: 'Submit the search query.',
      resetTitle: 'Clear the search query.',
    },
  };

  return <SearchBoxUiComponent {...props} {...uiProps} />;
}
