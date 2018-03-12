import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { GeoSearch } from '../packages/react-instantsearch/dom';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('GeoSearch', module);

stories.addWithJSX(
  'default',
  () => (
    <WrapWithHits
      linkedStoryGroup="GeoSearch"
      indexName="airbnb"
      searchParameters={{
        hitsPerPage: 25,
      }}
    >
      <GeoSearch
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.31&key=AIzaSyCl2TTJXpwxGuuc2zQZkAlIkWhpYbyjjP8"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </WrapWithHits>
  ),
  {
    displayName,
    filterProps,
  }
);
