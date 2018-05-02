import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Configure } from 'react-instantsearch-dom';
import {
  GoogleMapsLoader,
  GeoSearch,
  Marker,
  Redo,
  Control,
} from 'react-instantsearch-dom-maps';
import { displayName, filterProps, WrapWithHits } from './util';
import Places from './places';

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

// With Places
stories.addWithJSX(
  'with Places',
  () => (
    <WrapWithHits
      indexName="airbnb"
      linkedStoryGroup="GeoSearch"
      searchParameters={{
        hitsPerPage: 20,
        aroundRadius: 5000,
      }}
    >
      <Places
        defaultRefinement={{
          lat: 37.7793,
          lng: -122.419,
        }}
      />

      <Container>
        <GoogleMapsLoader apiKey="AIzaSyCl2TTJXpwxGuuc2zQZkAlIkWhpYbyjjP8">
          {google => (
            <GeoSearch google={google} initialZoom={12}>
              {({ hits }) => (
                <Fragment>
                  <Control />

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
  )
  .addWithJSX(
    'with <Redo> component',
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
                    <Redo />

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
    'with <Control> component',
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
                    <Control />

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
    'with <Control> component disabled',
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
                    <Control enableRefineOnMapMove={false} />

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

stories.addWithJSX('with unmount', () => {
  class Example extends Component {
    state = {
      visible: true,
    };

    onToggle = () =>
      this.setState(({ visible }) => ({
        visible: !visible,
      }));

    render() {
      const { visible } = this.state;

      return (
        <WrapWithHits
          indexName="airbnb"
          linkedStoryGroup="GeoSearch"
          searchParameters={{ hitsPerPage: 20 }}
        >
          <Configure aroundLatLngViaIP />

          <button onClick={this.onToggle} style={{ marginBottom: 15 }}>
            {visible ? 'Unmout' : 'Mount'}
          </button>

          {visible && (
            <Container>
              <GoogleMapsLoader apiKey="AIzaSyCl2TTJXpwxGuuc2zQZkAlIkWhpYbyjjP8">
                {google => (
                  <GeoSearch google={google}>
                    {({ hits }) => (
                      <Fragment>
                        {hits.map(hit => (
                          <Marker key={hit.objectID} hit={hit} />
                        ))}
                      </Fragment>
                    )}
                  </GeoSearch>
                )}
              </GoogleMapsLoader>
            </Container>
          )}
        </WrapWithHits>
      );
    }
  }

  return <Example />;
});
