import index from 'instantsearch.js/es/widgets/index/index';
import { useMemo } from 'react';

import { useIndexContext } from '../lib/useIndexContext';

import { useForceUpdate } from './useForceUpdate';
import { useInstantSearchContext } from './useInstantSearchContext';
import { useInstantSearchServerContext } from './useInstantSearchServerContext';
import { useInstantSearchSSRContext } from './useInstantSearchSSRContext';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useStableValue } from './useStableValue';
import { useWidget } from './useWidget';

import type {
  IndexWidgetParams,
  IndexWidget,
} from 'instantsearch.js/es/widgets/index/index';

type UseIndexOwnProps = { parentIndexId?: string };

export type UseIndexProps = IndexWidgetParams & UseIndexOwnProps;

export function useIndex(props: UseIndexProps) {
  const serverContext = useInstantSearchServerContext();
  const ssrContext = useInstantSearchSSRContext();
  const initialResults = ssrContext?.initialResults;
  const parentIndex = useParentIndex(props);
  const stableProps = useStableValue(props);
  const indexWidget = useMemo(() => index(stableProps), [stableProps]);
  const helper = indexWidget.getHelper();
  const forceUpdate = useForceUpdate();

  useIsomorphicLayoutEffect(() => {
    forceUpdate();
  }, [helper, forceUpdate]);

  useWidget({
    widget: indexWidget,
    parentIndex,
    props: stableProps,
    shouldSsr: Boolean(serverContext || initialResults),
  });

  return indexWidget;
}

function useParentIndex({ parentIndexId }: UseIndexOwnProps) {
  const physicalParentIndex = useIndexContext();
  const search = useInstantSearchContext();

  if (parentIndexId) {
    return findIndex(
      (currentIndex) => currentIndex.getIndexId() === parentIndexId,
      search.mainIndex
    );
  }

  return physicalParentIndex;
}

function findIndex(
  condition: (currentIndex: IndexWidget) => boolean,
  startIndex: IndexWidget
): IndexWidget {
  if (condition(startIndex)) {
    return startIndex;
  }

  const childIndices = startIndex
    .getWidgets()
    .filter((widget): widget is IndexWidget => widget.$$type === 'ais.index');

  for (let i = 0; i++; i < childIndices.length) {
    const childIndex = childIndices[i];
    if (findIndex(condition, childIndex)) {
      return childIndex;
    }
  }

  throw new Error("Couldn't find index with the given condition.");
}
