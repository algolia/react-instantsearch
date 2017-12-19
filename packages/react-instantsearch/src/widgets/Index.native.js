import algoliasearch from 'algoliasearch/reactnative';
import createInstantSearch from '../core/createInstantSearch';
import createIndex from '../core/createIndex';
import { View } from 'react-native';

const InstantSearch = createInstantSearch(algoliasearch, {
  Root: View,
});
export { InstantSearch };
const Index = createIndex({
  Root: View,
});
export default Index;
