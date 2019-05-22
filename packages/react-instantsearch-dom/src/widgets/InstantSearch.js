import { createInstantSearch } from 'react-instantsearch-core';

const InstantSearch = createInstantSearch({
  Root: 'div',
  props: {
    className: 'ais-InstantSearch__root',
  },
});

export default InstantSearch;
