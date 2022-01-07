import { PoweredByRenderState } from 'instantsearch.js/es/connectors/powered-by/connectPoweredBy';
import { safelyRunOnBrowser } from 'instantsearch.js/es/lib/utils';

export function usePoweredBy(): PoweredByRenderState {
  return {
    url: `https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=${safelyRunOnBrowser(
      ({ window }) => window.location?.hostname || '',
      { fallback: () => '' }
    )}&utm_campaign=poweredby`,
  };
}
