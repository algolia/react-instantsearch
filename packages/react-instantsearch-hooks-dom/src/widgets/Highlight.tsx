import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';
import React from 'react';

import { Highlight as HighlightUiComponent } from '../ui/Highlight';

import type { PartialKeys, CSSClasses } from '../types';
import type { HighlightProps as HighlightUiComponentProps } from '../ui/Highlight';
import type { BaseHit, Hit } from 'instantsearch.js';

export type HighlightProps<THit extends Hit<BaseHit>> = {
  hit: THit;
  attribute: keyof THit | string[];
} & PartialKeys<
  Omit<HighlightUiComponentProps, 'parts' | 'cssClasses'>,
  'highlightedTagName' | 'nonHighlightedTagName' | 'separator'
> &
  CSSClasses<HighlightUiComponentProps>;

export function Highlight<THit extends Hit<BaseHit>>({
  hit,
  attribute,
  cssClasses = {},
  highlightedTagName,
  nonHighlightedTagName,
  separator,
  ...props
}: HighlightProps<THit>) {
  const property =
    getPropertyByPath(hit._highlightResult, attribute as string) || [];
  const properties = Array.isArray(property) ? property : [property];

  const parts = properties.map((singleValue) =>
    getHighlightedParts(singleValue.value || '')
  );

  return (
    <HighlightUiComponent
      {...props}
      cssClasses={{
        root: ['ais-Highlight', cssClasses.root],
        highlighted: ['ais-Highlight-highlighted', cssClasses.highlighted],
        nonHighlighted: [
          'ais-Highlight-nonHighlighted',
          cssClasses.nonHighlighted,
        ],
        separator: ['ais-Highlight-separator', cssClasses.separator],
      }}
      parts={parts}
      highlightedTagName={highlightedTagName}
      nonHighlightedTagName={nonHighlightedTagName}
      separator={separator}
    />
  );
}
