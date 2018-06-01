import React from 'react';
import { storiesOf } from '@storybook/react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-next';

const stories = storiesOf('<Next>', module);
const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

stories
  .add('default', () => (
    <InstantSearch searchClient={client} indexName="instant_search">
      <SearchBox />
      <RefinementList attribute="categories" />
      <Hits />
    </InstantSearch>
  ))
  .add('single Hit render', () => (
    <InstantSearch searchClient={client} indexName="instant_search">
      <SearchBox />
      <RefinementList attribute="categories" />
      <Hits
        renderHit={hit => (
          <li key={hit.objectID} className="ais-Hits-item">
            <p>objectID: {hit.objectID}</p>
            <p>
              name: <Highlight hit={hit} attribute="name" />
            </p>
          </li>
        )}
      />
    </InstantSearch>
  ));
