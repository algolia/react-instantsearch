import connectHierarchicalMenu from 'instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu.js';

import { useConnector } from './useConnector.js';

import type {
  HierarchicalMenuConnectorParams,
  HierarchicalMenuWidgetDescription,
} from 'instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu.js';

export type UseHierarchicalMenuProps = HierarchicalMenuConnectorParams;

export function useHierarchicalMenu(props: UseHierarchicalMenuProps) {
  return useConnector<
    HierarchicalMenuConnectorParams,
    HierarchicalMenuWidgetDescription
  >(connectHierarchicalMenu, props);
}
