import algoliasearch from 'algoliasearch/reactnative';
import { createInstantSearch, createIndex } from 'react-instantsearch-core';
import { View } from 'react-native';

export const InstantSearch = createInstantSearch(algoliasearch, {
  Root: View,
});

export const Index = createIndex({
  Root: View,
});

export { Configure } from 'react-instantsearch-core';
