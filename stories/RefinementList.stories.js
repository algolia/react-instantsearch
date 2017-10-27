import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import {
  RefinementList,
  Panel,
  SearchBox,
} from '../packages/react-instantsearch/dom';
import { withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { changeDisplayName, filteredProps, WrapWithHits } from './util';
import { orderBy } from 'lodash';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('RefinementList', module);

stories
  .addDecorator(withKnobs)
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList attributeName="category" />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'with selected item',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList
          attributeName="category"
          defaultRefinement={['Dining']}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'with show more',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList
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
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList attributeName="category" withSearchBox />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'with the sort strategy changed',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList
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
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <Panel title="Category">
          <RefinementList attributeName="category" />
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'with panel but no refinement',
    () => (
      <WrapWithHits
        searchBox={false}
        linkedStoryGroup="RefinementList"
        hasPlayground={true}
      >
        <Panel title="Category">
          <RefinementList attributeName="category" />
          <div style={{ display: 'none' }}>
            <SearchBox defaultRefinement="ds" />
          </div>
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'playground',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList">
        <RefinementList
          attributeName="category"
          defaultRefinement={array('defaultSelectedItem', [
            'Decoration',
            'Lighting',
          ])}
          limitMin={number('limitMin', 10)}
          limitMax={number('limitMax', 20)}
          showMore={boolean('showMore', true)}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  );
