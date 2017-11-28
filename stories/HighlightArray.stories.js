import React, { Component } from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import {
  ClearAll,
  Highlight,
  InstantSearch,
  Pagination,
  SearchBox,
} from '../packages/react-instantsearch/dom';
import { connectHits } from '../packages/react-instantsearch/connectors';
import { displayName, filterProps } from './util';

import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('HighlightWithArray', module);

const CustomHits = connectHits(({ hits }) => (
  <div className="hits">
    {hits.map(hit => (
      <div key={hit.objectID} className="hit">
        <div className="hit-content">
          <div>
            <div>{hit.name}</div>
          </div>

          <div className="hit-tags">
            <Highlight attributeName="tags" hit={hit} />
          </div>
        </div>
      </div>
    ))}
  </div>
));

class AppWithArray extends Component {
  render() {
    return (
      <InstantSearch
        appId="KY4PR9ORUL"
        apiKey="a5ca312adab3b79e14054154efa00b37"
        indexName="highlight_array"
      >
        <SearchBox
          translations={{
            placeholder: 'Search into our furnitures: chair, table, tv unit...',
          }}
        />
        <ClearAll translations={{ reset: 'Clear all filters' }} />
        <CustomHits />
        <Pagination />
      </InstantSearch>
    );
  }
}

stories.addWithJSX('default', () => <AppWithArray />, {
  displayName,
  filterProps,
});
