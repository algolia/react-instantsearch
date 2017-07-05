import { createInstantSearch } from './src/core/createInstantSearchServer';
import algoliasearch from 'algoliasearch/lite';

const { InstantSearch, findResultsState } = createInstantSearch(algoliasearch, {
  Root: 'div',
  props: { className: 'ais-InstantSearch__root' },
});
export { InstantSearch, findResultsState };
