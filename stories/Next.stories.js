import React from 'react';
import { storiesOf } from '@storybook/react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-next';

const stories = storiesOf('<Next>', module);
const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

stories.add('default', () => (
  <InstantSearch searchClient={client} indexName="ikea">
    <SearchBox />
    <RefinementList attribute="category" />
    <Hits />
  </InstantSearch>
));
