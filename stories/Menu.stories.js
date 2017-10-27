import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { Menu, Panel, SearchBox } from '../packages/react-instantsearch/dom';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { changeDisplayName, filteredProps, WrapWithHits } from './util';
import { orderBy } from 'lodash';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('Menu', module);

stories
  .addDecorator(withKnobs)
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu attributeName="category" />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'with default selected item',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu attributeName="category" defaultRefinement="Eating" />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
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
    { displayName: changeDisplayName, filterProps: filteredProps }
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
            )}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'with the sort strategy changed',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Menu
          attributeName="category"
          transformItems={items =>
            orderBy(items, ['label', 'count'], ['asc', 'desc'])}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'with panel',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="Menu">
        <Panel title="Category">
          <Menu attributeName="category" />
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'with panel but no available refinement',
    () => (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="Menu"
      >
        <Panel title="Category">
          <Menu attributeName="category" />
          <div style={{ display: 'none' }}>
            <SearchBox defaultRefinement="dkjsakdjskajdksjakdjaskj" />
          </div>
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
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
    { displayName: changeDisplayName, filterProps: filteredProps }
  );
