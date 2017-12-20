import createInstantSearch from '../core/createInstantSearch';
import algoliasearch from 'algoliasearch/lite';

const InstantSearch = createInstantSearch(algoliasearch, {
  Root: 'div',
  props: { className: 'ais-InstantSearch__root' },
});
export default InstantSearch;
