import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';
import React from 'react';

import { Highlight as HighlightUiComponent } from '../ui/Highlight';

import type { HighlightProps as HighlightUiComponentProps } from '../ui/Highlight';
import type { BaseHit, Hit } from 'instantsearch.js';

/**
 * Make certain keys of an object optional
 */
type PartialKeys<TObj, TKeys extends keyof TObj> = Omit<TObj, TKeys> &
  Partial<Pick<TObj, TKeys>>;

export type SnippetProps<THit extends Hit<BaseHit>> = {
  hit: THit;
  attribute: keyof THit | string[];
} & PartialKeys<
  Omit<HighlightUiComponentProps, 'baseClassName' | 'parts' | 'partsMultiple'>,
  'highlightedTagName' | 'nonHighlightedTagName' | 'separator'
>;

export function Snippet<THit extends Hit<BaseHit>>({
  hit,
  attribute,
  highlightedTagName,
  nonHighlightedTagName,
  separator,
  ...props
}: SnippetProps<THit>) {
  const property =
    getPropertyByPath(hit._snippetResult, attribute as string) || {};

  if (Array.isArray(property)) {
    const parts = property.map((singleValue) =>
      getHighlightedParts(singleValue.value || '')
    );

    return (
      <HighlightUiComponent
        {...props}
        baseClassName="ais-Snippet"
        partsMultiple={parts}
        parts={[]}
        highlightedTagName={highlightedTagName}
        nonHighlightedTagName={nonHighlightedTagName}
        separator={separator}
      />
    );
  }

  const parts = getHighlightedParts(property.value || '');

  return (
    <HighlightUiComponent
      {...props}
      baseClassName="ais-Snippet"
      parts={parts}
      partsMultiple={[]}
      highlightedTagName={highlightedTagName}
      nonHighlightedTagName={nonHighlightedTagName}
      separator={separator}
    />
  );
}
