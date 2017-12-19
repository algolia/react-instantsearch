import createInstantSearch from '../core/createInstantSearch';
import createIndex from '../core/createIndex';
import algoliasearch from 'algoliasearch/lite';

const InstantSearch = createInstantSearch(algoliasearch, {
  Root: 'div',
  props: { className: 'ais-InstantSearch__root' },
});
export { InstantSearch };
const Index = createIndex({
  Root: 'div',
  props: { className: 'ais-MultiIndex__root' },
});
export default Index;
