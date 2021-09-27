import index from 'instantsearch.js/cjs/widgets/index/index';
import { useEffect, useMemo } from 'react';

import { useIndexContext } from './useIndexContext';

import type { IndexWidgetParams } from 'instantsearch.js/es/widgets/index/index';

export type UseIndexProps = IndexWidgetParams;

export function useIndex(props: UseIndexProps) {
  const searchIndex = useIndexContext();
  const indexWidget = useMemo(() => index(props), [props]);

  useEffect(() => {
    searchIndex.addWidgets([indexWidget]);

    return () => {
      searchIndex.removeWidgets([indexWidget]);
    };
  }, [searchIndex, indexWidget]);

  return indexWidget;
}
