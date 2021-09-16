import index from 'instantsearch.js/cjs/widgets/index/index';
// eslint-disable-next-line import/named
import { IndexWidgetParams } from 'instantsearch.js/es/widgets/index/index';
import { useEffect, useMemo } from 'react';

import { useIndexContext } from './useIndexContext';

export type UseIndexProps = IndexWidgetParams;

export function useIndex(props: UseIndexProps) {
  const searchIndex = useIndexContext();
  const widget = useMemo(() => index(props), [props]);

  useEffect(() => {
    searchIndex.addWidgets([widget]);

    return () => {
      searchIndex.removeWidgets([widget]);
    };
  }, [searchIndex, widget]);

  return widget;
}
