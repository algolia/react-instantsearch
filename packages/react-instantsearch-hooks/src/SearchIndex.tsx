import React from 'react';

import { IndexContext } from './IndexContext.js';
import { useIndex } from './useIndex.js';

import type { UseIndexProps } from './useIndex.js';

export type IndexProps = UseIndexProps & {
  children?: React.ReactNode;
};

export function Index({ children, ...props }: IndexProps) {
  const index = useIndex(props);

  if (index.getHelper() === null) {
    return null;
  }

  return (
    <IndexContext.Provider value={index}>{children}</IndexContext.Provider>
  );
}
