import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';
import React from 'react';

import { Highlight as HighlightUiComponent } from '../ui/Highlight';

import type { PartialKeys, ClassNames } from '../types';
import type { HighlightProps as HighlightUiComponentProps } from '../ui/Highlight';
import type { BaseHit, Hit } from 'instantsearch.js';

export type HighlightProps<THit extends Hit<BaseHit>> = {
  hit: THit;
  attribute: keyof THit | string[];
} & PartialKeys<
  Omit<HighlightUiComponentProps, 'parts' | 'classNames'>,
  'highlightedTagName' | 'nonHighlightedTagName' | 'separator'
> &
  ClassNames<HighlightUiComponentProps>;

export function Highlight<THit extends Hit<BaseHit>>({
  hit,
  attribute,
  classNames = {},
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
      classNames={{
        root: ['ais-Highlight', classNames.root],
        highlighted: ['ais-Highlight-highlighted', classNames.highlighted],
        nonHighlighted: [
          'ais-Highlight-nonHighlighted',
          classNames.nonHighlighted,
        ],
        separator: ['ais-Highlight-separator', classNames.separator],
      }}
      parts={parts}
      highlightedTagName={highlightedTagName}
      nonHighlightedTagName={nonHighlightedTagName}
      separator={separator}
    />
  );
}
