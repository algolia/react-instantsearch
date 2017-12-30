import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { HitsPerPage } from '../packages/react-instantsearch/dom';
import { number } from '@storybook/addon-knobs';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('HitsPerPage', module);

stories
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="HitsPerPage">
        <HitsPerPage
          defaultRefinement={4}
          items={[
            { value: 2, label: '2 hits per page' },
            { value: 4, label: '4 hits per page' },
            { value: 6, label: '6 hits per page' },
            { value: 8, label: '8 hits per page' },
          ]}
        />
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
      <WrapWithHits hasPlayground={true} linkedStoryGroup="HitsPerPage">
        <HitsPerPage
          defaultRefinement={4}
          items={[
            { value: 2, label: '2 hits per page' },
            { value: 4, label: '4 hits per page' },
            { value: 6, label: '6 hits per page' },
            { value: 8, label: '8 hits per page' },
          ]}
          header="Hits per page"
          footer="Footer"
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'without label',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="HitsPerPage">
        <HitsPerPage
          defaultRefinement={4}
          items={[{ value: 2 }, { value: 4 }, { value: 6 }, { value: 8 }]}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'playground',
    () => (
      <WrapWithHits linkedStoryGroup="HitsPerPage">
        <HitsPerPage
          defaultRefinement={number('default hits per page', 4)}
          items={[
            { value: 2, label: '2 hits per page' },
            { value: 4, label: '4 hits per page' },
            { value: 6, label: '6 hits per page' },
            { value: 8, label: '8 hits per page' },
          ]}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
