import React from 'react';

import { InternalHighlight } from './InternalHighlight';
import { cx } from './lib/cx';

import type { ClassNames } from '../types';
import type {
  InternalHighlightProps,
  InternalHighlightClassNames,
} from './InternalHighlight';

export type SnippetClassNames = InternalHighlightClassNames;
export type SnippetProps = ClassNames<InternalHighlightProps>;

export function Snippet({ classNames = {}, ...props }: SnippetProps) {
  return (
    <InternalHighlight
      classNames={{
        root: cx('ais-Snippet', classNames.root),
        highlighted: cx('ais-Snippet-highlighted', classNames.highlighted),
        nonHighlighted: cx(
          'ais-Snippet-nonHighlighted',
          classNames.nonHighlighted
        ),
        separator: cx('ais-Snippet-separator', classNames.separator),
      }}
      {...props}
    />
  );
}
