import { createInstantSearch as cis } from './src/core/createInstantSearchServer';
import algoliasearch from 'algoliasearch/lite';

export const createInstantSearch = function() {
  return cis(algoliasearch);
};
