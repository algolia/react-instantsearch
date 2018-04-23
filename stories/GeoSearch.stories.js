import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import HelloWorld from '../packages/react-instantsearch-dom-geo/src/index';
import { displayName, filterProps, WrapWithHits } from './util';

setAddon(JSXAddon);

const stories = storiesOf('GeoSearch', module);

stories.addWithJSX(
  'default',
  () => (
    <WrapWithHits linkedStoryGroup="GeoSearch">
      <HelloWorld />
    </WrapWithHits>
  ),
  {
    displayName,
    filterProps,
  }
);
