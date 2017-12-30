import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { Menu, SearchBox } from '../packages/react-instantsearch/dom';
import { text, boolean, number } from '@storybook/addon-knobs';
import { displayName, filterProps, WrapWithHits } from './util';
import { orderBy } from 'lodash';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('Menu', module);

stories
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu attributeName="category" />
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
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu attributeName="category" header="Menu" footer="Footer" />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'hidden without items to refine',
    () => (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="Menu"
      >
        <Menu attributeName="category" header="Menu" autoHideContainer />

        <div style={{ display: 'none' }}>
          <SearchBox defaultRefinement="dkjsakdjskajdksjakdjaskj" />
        </div>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'visible without items to refine',
    () => (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="Menu"
      >
        <Menu attributeName="category" header="Menu" />

        <div style={{ display: 'none' }}>
          <SearchBox defaultRefinement="dkjsakdjskajdksjakdjaskj" />
        </div>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with default selected item',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu attributeName="category" defaultRefinement="Eating" />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with show more',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu
          attributeName="category"
          limitMin={2}
          limitMax={5}
          showMore={true}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with search inside items',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu
          attributeName="category"
          withSearchBox
          transformItems={items =>
            orderBy(
              items,
              ['isRefined', 'count', 'label'],
              ['desc', 'desc', 'asc']
            )
          }
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with the sort strategy changed',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu
          attributeName="category"
          transformItems={items =>
            orderBy(items, ['label', 'count'], ['asc', 'desc'])
          }
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
      <WrapWithHits linkedStoryGroup="Menu">
        <Menu
          attributeName="category"
          defaultRefinement={text('defaultSelectedItem', 'Bathroom')}
          limitMin={number('limitMin', 10)}
          limitMax={number('limitMax', 20)}
          showMore={boolean('showMore', true)}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
