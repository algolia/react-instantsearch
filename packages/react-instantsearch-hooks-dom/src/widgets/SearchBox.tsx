import React, { useEffect, useRef, useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';

import { cx } from '../ui/lib/cx';
import { SearchBox as SearchBoxUiComponent } from '../ui/SearchBox';

import type { ClassNames } from '../types';
import type { SearchBoxProps as SearchBoxUiComponentProps } from '../ui/SearchBox';
import type { ChangeEvent } from 'react';
import type { UseSearchBoxProps } from 'react-instantsearch-hooks';

export type SearchBoxProps = Omit<
  ClassNames<SearchBoxUiComponentProps>,
  'inputRef' | 'isSearchStalled' | 'onChange' | 'onReset' | 'value'
> &
  UseSearchBoxProps;

export function SearchBox({ classNames = {}, ...props }: SearchBoxProps) {
  const { query, refine, isSearchStalled } = useSearchBox(props, {
    $$widgetType: 'ais.searchBox',
  });
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  function onReset() {
    setValue('');
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  // Track when the value coming from the React state changes to synchronize
  // it with InstantSearch.
  useEffect(() => {
    if (query !== value) {
      refine(value);
    }
    // We don't want to track when the InstantSearch query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, refine]);

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  useEffect(() => {
    // We bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (document.activeElement !== inputRef.current && query !== value) {
      setValue(query);
    }
    // We don't want to track when the React state value changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <SearchBoxUiComponent
      {...props}
      classNames={{
        root: cx('ais-SearchBox', classNames.root),
        form: cx('ais-SearchBox-form', classNames.form),
        input: cx('ais-SearchBox-input', classNames.input),
        submit: cx('ais-SearchBox-submit', classNames.submit),
        reset: cx('ais-SearchBox-reset', classNames.reset),
        loadingIndicator: cx(
          'ais-SearchBox-loadingIndicator',
          classNames.loadingIndicator
        ),
        submitIcon: cx('ais-SearchBox-submitIcon', classNames.submitIcon),
        resetIcon: cx('ais-SearchBox-resetIcon', classNames.resetIcon),
        loadingIcon: cx('ais-SearchBox-loadingIcon', classNames.loadingIcon),
      }}
      inputRef={inputRef}
      isSearchStalled={isSearchStalled}
      onChange={onChange}
      onReset={onReset}
      value={value}
    />
  );
}
