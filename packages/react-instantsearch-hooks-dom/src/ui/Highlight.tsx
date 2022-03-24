import React from 'react';

import { InternalHighlight } from './InternalHighlight';
import { cx } from './lib/cx';

import type { ClassNames } from '../types';
import type {
  InternalHighlightProps,
  InternalHighlightClassNames,
} from './InternalHighlight';

export type HighlightClassNames = InternalHighlightClassNames;
export type HighlightProps = ClassNames<InternalHighlightProps>;

export function Highlight({ classNames = {}, ...props }: HighlightProps) {
  return (
    <InternalHighlight
      classNames={{
        root: cx('ais-Highlight', classNames.root),
        highlighted: cx('ais-Highlight-highlighted', classNames.highlighted),
        nonHighlighted: cx(
          'ais-Highlight-nonHighlighted',
          classNames.nonHighlighted
        ),
        separator: cx('ais-Highlight-separator', classNames.separator),
      }}
      {...props}
    />
  );
}
