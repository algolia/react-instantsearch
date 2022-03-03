import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';
import React from 'react';

import { Highlight as HighlightUiComponent } from '../ui/Highlight';

import type { PartialKeys, PathTupleOrString } from '../types';
import type { HighlightProps as HighlightUiComponentProps } from '../ui/Highlight';
import type { BaseHit, Hit } from 'instantsearch.js';

export type HighlightProps<THit extends Hit<BaseHit>> = {
  hit: THit;
  attribute: PathTupleOrString<THit>;
} & PartialKeys<
  Omit<HighlightUiComponentProps, 'baseClassName' | 'parts'>,
  'highlightedTagName' | 'nonHighlightedTagName' | 'separator'
>;

export function Highlight<THit extends Hit<BaseHit>>({
  hit,
  attribute,
  highlightedTagName,
  nonHighlightedTagName,
  separator,
  ...props
}: HighlightProps<THit>) {
  const property =
    getPropertyByPath(hit._highlightResult, attribute as unknown as string) || [];
  const properties = Array.isArray(property) ? property : [property];

  const parts = properties.map((singleValue) =>
    getHighlightedParts(singleValue.value || '')
  );

  return (
    <HighlightUiComponent
      {...props}
      baseClassName="ais-Highlight"
      parts={parts}
      highlightedTagName={highlightedTagName}
      nonHighlightedTagName={nonHighlightedTagName}
      separator={separator}
    />
  );
}
