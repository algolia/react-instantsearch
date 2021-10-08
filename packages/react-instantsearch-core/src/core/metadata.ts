import { SearchClient } from '../widgets/InstantSearch';
import { WidgetsManager } from './createWidgetsManager';

export function isMetadataEnabled() {
  return (
    typeof window !== 'undefined' &&
    window.navigator.userAgent.indexOf('Algolia Crawler') > -1
  );
}

export function getMetadataPayload(
  widgetsManager: WidgetsManager,
  searchClient: SearchClient
) {
  const internalProps = ['contextValue', 'indexContextValue'];

  const widgets = widgetsManager.getWidgets().map(({ props, constructor }) => {
    const { defaultProps = {}, displayName = constructor.displayName } =
      constructor._connectorDesc || {};

    return {
      displayName,
      params: Object.keys(props).filter(
        prop =>
          !internalProps.includes(prop) &&
          defaultProps[prop] !== props[prop] &&
          props[prop] !== undefined
      ),
    };
  });

  const client = searchClient as Record<string, any>;
  const ua =
    client.transporter && client.transporter.userAgent
      ? client.transporter.userAgent.value
      : client._ua;

  return {
    ua,
    widgets,
  };
}

export function metadata(
  widgetsManager: WidgetsManager,
  searchClient: SearchClient
) {
  const payloadContainer = document.createElement('meta');
  const refNode = document.querySelector('head')!;
  payloadContainer.name = 'algolia:metadata';

  const payload = getMetadataPayload(widgetsManager, searchClient);

  payloadContainer.content = JSON.stringify(payload);
  refNode.appendChild(payloadContainer);
}
