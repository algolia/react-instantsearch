import {
  createInstantSearch,
  findResults,
} from './src/core/createInstantSearchServer';
import algoliasearch from 'algoliasearch/lite';

const InstantSearch = createInstantSearch(algoliasearch, {
  Root: 'div',
  props: { className: 'ais-InstantSearch__root' },
});
export { InstantSearch, findResults };
