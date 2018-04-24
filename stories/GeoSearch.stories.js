import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import {
  GoogleMapsLoader,
  GeoSearch,
  Marker,
} from '../packages/react-instantsearch-dom-geo/src/index';
import { displayName, filterProps, WrapWithHits } from './util';
import { Configure } from '../packages/react-instantsearch/dom';

setAddon(JSXAddon);

const stories = storiesOf('GeoSearch', module);

const Container = ({ children }) => (
  <div style={{ height: 500 }}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

const initialZoom = 12;
const initialPosition = {
  lat: 40.71,
  lng: -74.01,
};

stories.addWithJSX(
  'default',
  () => (
    <WrapWithHits
      indexName="airbnb"
      linkedStoryGroup="GeoSearch"
      searchParameters={{ hitsPerPage: 20 }}
    >
      <Configure aroundLatLngViaIP />

      <Container>
        <GoogleMapsLoader apiKey="AIzaSyCl2TTJXpwxGuuc2zQZkAlIkWhpYbyjjP8">
          {google => (
            <GeoSearch google={google}>
              {({ hits }) => (
                <Fragment>
                  {hits.map(hit => <Marker key={hit.objectID} hit={hit} />)}
                </Fragment>
              )}
            </GeoSearch>
          )}
        </GoogleMapsLoader>
      </Container>
    </WrapWithHits>
  ),
  {
    displayName,
    filterProps,
  }
);

// Only UI
stories
  .addWithJSX(
    'with zoom & center',
    () => (
      <WrapWithHits
        indexName="airbnb"
        linkedStoryGroup="GeoSearch"
        searchParameters={{ hitsPerPage: 20 }}
      >
        <Configure aroundLatLngViaIP />

        <Container>
          <GoogleMapsLoader apiKey="AIzaSyCl2TTJXpwxGuuc2zQZkAlIkWhpYbyjjP8">
            {google => (
              <GeoSearch
                google={google}
                initialZoom={initialZoom}
                initialPosition={initialPosition}
              >
                {({ hits }) => (
                  <Fragment>
                    {hits.map(hit => <Marker key={hit.objectID} hit={hit} />)}
                  </Fragment>
                )}
              </GeoSearch>
            )}
          </GoogleMapsLoader>
        </Container>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with map options',
    () => (
      <WrapWithHits
        indexName="airbnb"
        linkedStoryGroup="GeoSearch"
        searchParameters={{ hitsPerPage: 20 }}
      >
        <Configure aroundLatLngViaIP />

        <Container>
          <GoogleMapsLoader apiKey="AIzaSyCl2TTJXpwxGuuc2zQZkAlIkWhpYbyjjP8">
            {google => (
              <GeoSearch
                google={google}
                mapOptions={{
                  streetViewControl: true,
                }}
              >
                {({ hits }) => (
                  <Fragment>
                    {hits.map(hit => <Marker key={hit.objectID} hit={hit} />)}
                  </Fragment>
                )}
              </GeoSearch>
            )}
          </GoogleMapsLoader>
        </Container>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
