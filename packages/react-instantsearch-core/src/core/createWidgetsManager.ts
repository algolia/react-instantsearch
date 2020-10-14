import { SearchParameters } from 'algoliasearch-helper';
import { IndexContext, InstantSearchContext } from './context';
import { ConnectorDescription } from './createConnector';
import { Metadata, SearchState } from './createStore';
import { defer } from './utils';

// @TODO: maybe something like ReturnType<ReturnType<typeof createConnectorWithoutContext>>;
export type Widget = {
  // @TODO: can currently not be used from a widget interface since they're typed as any
  // update the type whenever you use it
  [TKey in keyof Omit<ConnectorDescription, 'displayName'>]: any;
} & {
  props: Record<string, any> & {
    contextValue: InstantSearchContext;
    indexContextValue?: IndexContext;
  };
  getProvidedProps(props: Widget['props']): Record<string, any>;
  getMetadata(state: SearchState): Metadata;
  getSearchParameters(searchParameters: SearchParameters): SearchParameters;
  transitionState(
    searchState: SearchState,
    nextSearchState: SearchState
  ): SearchState;
};

export default function createWidgetsManager(onWidgetsUpdate: () => void) {
  const widgets: Widget[] = [];
  // Is an update scheduled?
  let scheduled = false;

  // The state manager's updates need to be batched since more than one
  // component can register or unregister widgets during the same tick.
  function scheduleUpdate() {
    if (scheduled) {
      return;
    }
    scheduled = true;
    defer(() => {
      scheduled = false;
      onWidgetsUpdate();
    });
  }

  return {
    registerWidget(widget: Widget) {
      widgets.push(widget);
      scheduleUpdate();
      return function unregisterWidget() {
        widgets.splice(widgets.indexOf(widget), 1);
        scheduleUpdate();
      };
    },
    update: scheduleUpdate,
    getWidgets() {
      return widgets;
    },
  };
}

export type WidgetsManager = ReturnType<typeof createWidgetsManager>;
