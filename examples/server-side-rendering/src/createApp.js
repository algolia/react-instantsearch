import algoliasearch from 'algoliasearch/lite';
// import { createInMemoryCache } from '@algolia/cache-in-memory';
import App from './App';
const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76',
  {
    // For testing with cache, uncomment cache related lines:
    // responsesCache: createInMemoryCache(),
    // requestsCache: createInMemoryCache({ serializable: false })
  }
);
export const createApp = () => {
  const indexName = 'instant_search';
  const props = {
    indexName,
    searchClient,
  };

  return {
    App,
    props,
  };
};

export default App;
