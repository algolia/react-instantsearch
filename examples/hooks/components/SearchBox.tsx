import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { UseSearchBoxProps } from 'react-instantsearch-hooks';
import { useSearchBox } from 'react-instantsearch-hooks';

import { ControlledSearchBox } from './ControlledSearchBox';

export function SearchBox(props?: UseSearchBoxProps) {
  const { query, refine, isSearchStalled } = useSearchBox(props);
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  function onReset() {
    setValue('');
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  useEffect(() => {
    refine(value);
  }, [refine, value]);

  useEffect(() => {
    if (query !== value) {
      setValue(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <ControlledSearchBox
      className={props.className}
      inputRef={inputRef}
      isSearchStalled={isSearchStalled}
      onChange={onChange}
      onReset={onReset}
      placeholder={props.placeholder}
      value={value}
    />
  );
}
