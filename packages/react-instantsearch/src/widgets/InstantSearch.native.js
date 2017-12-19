import algoliasearch from 'algoliasearch/reactnative';
import createInstantSearch from '../core/createInstantSearch';
import { View } from 'react-native';

const InstantSearch = createInstantSearch(algoliasearch, {
  Root: View,
});
export default InstantSearch;
