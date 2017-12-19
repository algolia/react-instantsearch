import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { InfiniteResults } from '../packages/react-instantsearch/dom';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('InfiniteResults', module);

stories
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="Hits" pagination={false}>
        <InfiniteResults />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with header and footer',
    () => (
      <WrapWithHits linkedStoryGroup="Hits" pagination={false}>
        <InfiniteResults header="Header" footer="Footer" />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
