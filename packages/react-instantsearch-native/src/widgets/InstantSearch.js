import { View } from 'react-native';
import { createInstantSearch } from 'react-instantsearch-core';

const InstantSearch = createInstantSearch({
  Root: View,
});

export default InstantSearch;
