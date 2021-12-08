import connectMenu from 'instantsearch.js/es/connectors/menu/connectMenu.js';

import { useConnector } from './useConnector.js';

import type {
  MenuConnectorParams,
  MenuWidgetDescription,
} from 'instantsearch.js/es/connectors/menu/connectMenu.js';

export type UseMenuProps = MenuConnectorParams;

export function useMenu(props: UseMenuProps) {
  return useConnector<MenuConnectorParams, MenuWidgetDescription>(
    connectMenu,
    props
  );
}
