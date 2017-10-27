import React from 'react';
import { orderBy } from 'lodash';
import { setAddon, storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { changeDisplayName, WrapWithHits } from './util';
import {
  MenuSelect,
  Panel,
  SearchBox,
} from '../packages/react-instantsearch/dom';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('MenuSelect', module);

stories
  .addDecorator(withKnobs)
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="MenuSelect">
        <MenuSelect attributeName="category" />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with default selected item',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="MenuSelect">
        <MenuSelect attributeName="category" defaultRefinement="Eating" />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with the sort strategy changed',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="MenuSelect">
        <MenuSelect
          attributeName="category"
          transformItems={items =>
            orderBy(items, ['label', 'count'], ['asc', 'desc'])}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with panel',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="MenuSelect">
        <Panel title="Category">
          <MenuSelect attributeName="category" />
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with panel but no available refinement',
    () => (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="MenuSelect"
      >
        <Panel title="Category">
          <MenuSelect attributeName="category" />
          <div style={{ display: 'none' }}>
            <SearchBox defaultRefinement="dkjsakdjskajdksjakdjaskj" />
          </div>
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'playground',
    () => (
      <WrapWithHits linkedStoryGroup="MenuSelect">
        <MenuSelect
          attributeName="category"
          defaultRefinement={text('defaultSelectedItem', 'Bathroom')}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  );
