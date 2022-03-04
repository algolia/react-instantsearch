import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';
import React from 'react';

import { Highlight as HighlightUiComponent } from '../ui/Highlight';

import type { CSSClasses, PartialKeys } from '../types';
import type { HighlightProps as HighlightUiComponentProps } from '../ui/Highlight';
import type { BaseHit, Hit } from 'instantsearch.js';

export type SnippetProps<THit extends Hit<BaseHit>> = {
  hit: THit;
  attribute: keyof THit | string[];
} & PartialKeys<
  Omit<HighlightUiComponentProps, 'parts' | 'cssClasses'>,
  'highlightedTagName' | 'nonHighlightedTagName' | 'separator'
> &
  CSSClasses<HighlightUiComponentProps>;

export function Snippet<THit extends Hit<BaseHit>>({
  hit,
  attribute,
  cssClasses = {},
  highlightedTagName,
  nonHighlightedTagName,
  separator,
  ...props
}: SnippetProps<THit>) {
  const property =
    getPropertyByPath(hit._snippetResult, attribute as string) || [];
  const properties = Array.isArray(property) ? property : [property];

  const parts = properties.map((singleValue) =>
    getHighlightedParts(singleValue.value || '')
  );

  return (
    <HighlightUiComponent
      {...props}
      cssClasses={{
        root: ['ais-Snippet', cssClasses.root],
        highlighted: ['ais-Snippet-highlighted', cssClasses.highlighted],
        nonHighlighted: [
          'ais-Snippet-nonHighlighted',
          cssClasses.nonHighlighted,
        ],
        separator: ['ais-Snippet-separator', cssClasses.separator],
      }}
      parts={parts}
      highlightedTagName={highlightedTagName}
      nonHighlightedTagName={nonHighlightedTagName}
      separator={separator}
    />
  );
}
