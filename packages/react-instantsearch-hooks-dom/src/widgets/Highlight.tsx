import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';
import React from 'react';

import { Highlight as HighlightUiComponent } from '../ui/Highlight';

import type { Hit as AlgoliaHit } from '@algolia/client-search';

export type HighlightProps<THit> = {
  hit: THit;
  attribute: keyof THit | string[];
  highlightedTagName?: React.ReactType;
  nonHighlightedTagName?: React.ReactType;
  className?: string;
  separator?: string;
};

export function Highlight<THit extends AlgoliaHit<Record<string, unknown>>>({
  hit,
  attribute,
  ...rest
}: HighlightProps<THit>) {
  const { value: attributeValue = '' } =
    getPropertyByPath(hit._highlightResult, attribute as string) || {};
  const parts = getHighlightedParts(attributeValue);

  return <HighlightUiComponent {...rest} parts={parts} />;
}
