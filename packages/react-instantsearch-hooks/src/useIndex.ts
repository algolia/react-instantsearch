import index from 'instantsearch.js/cjs/widgets/index/index';
// eslint-disable-next-line import/named
import { IndexWidgetParams } from 'instantsearch.js/es/widgets/index/index';
import { useEffect, useMemo } from 'react';

import { useIndexContext } from './useIndexContext';

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
