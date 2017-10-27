import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import {
  RangeInput,
  Panel,
  SearchBox,
} from '../packages/react-instantsearch/dom';
import { withKnobs, object, number } from '@storybook/addon-knobs';
import { changeDisplayName, WrapWithHits } from './util';

import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('RangeInput', module);

stories
  .addDecorator(withKnobs)
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <RangeInput attributeName="price" />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with panel',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <Panel title="Price">
          <RangeInput attributeName="price" />
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with no refinement',
    () => (
      <WrapWithHits searchBox={false} linkedStoryGroup="RangeInput">
        <RangeInput attributeName="price" />
        <div style={{ display: 'none' }}>
          <SearchBox defaultRefinement="ds" />
        </div>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with precision of 0',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <RangeInput attributeName="price" precision={0} />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with default value',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <RangeInput
          attributeName="price"
          defaultRefinement={{ min: 50, max: 200 }}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with min boundaries',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <RangeInput attributeName="price" min={30} />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with max boundaries',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <RangeInput attributeName="price" max={500} />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with min / max boundaries',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <RangeInput attributeName="price" min={30} max={500} />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with boundaries and default value',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <RangeInput
          attributeName="price"
          min={30}
          max={500}
          defaultRefinement={{ min: 50, max: 200 }}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with panel but no refinement',
    () => (
      <WrapWithHits searchBox={false} linkedStoryGroup="RangeInput">
        <Panel title="Price">
          <RangeInput attributeName="price" />
          <div style={{ display: 'none' }}>
            <SearchBox defaultRefinement="ds" />
          </div>
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'playground',
    () => (
      <WrapWithHits linkedStoryGroup="RangeInput">
        <RangeInput
          attributeName="price"
          min={number('min', 0)}
          max={number('max', 500)}
          precision={number('precision', 0)}
          defaultRefinement={object('default value', { min: 100, max: 400 })}
          translations={object('translations', {
            submit: ' go',
            separator: 'to',
          })}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  );
