import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import {
  NumericMenu,
  Panel,
  Configure,
} from '../packages/react-instantsearch/dom';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('NumericMenu', module);

stories
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="NumericMenu">
        <NumericMenu
          attributeName="price"
          items={[
            { end: 10, label: '<$10' },
            { start: 10, end: 100, label: '$10-$100' },
            { start: 100, end: 500, label: '$100-$500' },
            { start: 500, label: '>$500' },
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
      <WrapWithHits linkedStoryGroup="NumericMenu">
        <NumericMenu
          attributeName="price"
          items={[
            { end: 10, label: '<$10' },
            { start: 10, end: 100, label: '$10-$100' },
            { start: 100, end: 500, label: '$100-$500' },
            { start: 500, label: '>$500' },
          ]}
          header="Header"
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
    'with a default range selected',
    () => (
      <WrapWithHits linkedStoryGroup="NumericMenu">
        <NumericMenu
          attributeName="price"
          items={[
            { end: 10, label: '<$10' },
            { start: 10, end: 100, label: '$10-$100' },
            { start: 100, end: 500, label: '$100-$500' },
            { start: 500, label: '>$500' },
          ]}
          defaultRefinement=":10"
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with some non selectable ranges',
    () => (
      <WrapWithHits searchBox={false} linkedStoryGroup="NumericMenu">
        <NumericMenu
          attributeName="price"
          items={[
            { end: 10, label: '<$10' },
            { start: 10, end: 100, label: '$10-$100' },
            { start: 100, end: 500, label: '$100-$500' },
            { start: 90000, label: '>$90000' },
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
    'with panel',
    () => (
      <WrapWithHits linkedStoryGroup="NumericMenu">
        <Panel title="Price">
          <NumericMenu
            attributeName="price"
            items={[
              { end: 10, label: '<$10' },
              { start: 10, end: 100, label: '$10-$100' },
              { start: 100, end: 500, label: '$100-$500' },
              { start: 500, label: '>$500' },
            ]}
          />
        </Panel>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with panel but no available refinements',
    () => (
      <WrapWithHits searchBox={false} linkedStoryGroup="NumericMenu">
        <Panel title="Price">
          <Configure filters="price>200000" />
          <NumericMenu
            attributeName="price"
            items={[
              { end: 10, label: '<$10' },
              { start: 10, end: 100, label: '$10-$100' },
              { start: 100, end: 500, label: '$100-$500' },
              { start: 500, label: '>$500' },
            ]}
          />
        </Panel>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
