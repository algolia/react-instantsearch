import { useEffect, useState } from 'react';

import { useIndexContext } from './useIndexContext';
import { useStableValue } from './useStableValue';

import type { Connector, WidgetDescription } from 'instantsearch.js';

export function useConnector<
  TProps extends Record<string, unknown>,
  TDescription extends WidgetDescription
>(
  connector: Connector<TDescription, TProps>,
  props: TProps = {} as TProps,
  initialState:
    | TDescription['renderState']
    | (() => TDescription['renderState'])
) {
  const parentIndex = useIndexContext();
  const [state, setState] = useState(initialState);
  const stableProps = useStableValue(props);

  useEffect(() => {
    const createWidget = connector((connectorState, isFirstRender) => {
      // We skip the `init` widget render because:
      // - We rely on a computed initial state before the InstantSearch Core lifecycle starts.
      // - It prevents UI flashes when updating the widget props.
      if (isFirstRender) {
        return;
      }

      const { instantSearchInstance, widgetParams, ...renderState } =
        connectorState;

      setState(renderState);
    });
    const widget = createWidget(stableProps);

    parentIndex.addWidgets([widget]);

    return () => {
      parentIndex.removeWidgets([widget]);
    };
  }, [connector, parentIndex, stableProps]);

  return state;
}
