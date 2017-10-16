import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  RangeInput,
  Panel,
  SearchBox,
} from '../packages/react-instantsearch/dom';
import { withKnobs, object, number } from '@storybook/addon-knobs';
import { WrapWithHits } from './util';

const stories = storiesOf('RangeInput', module);

stories.addDecorator(withKnobs);

stories
  .add('default', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <RangeInput attributeName="price" />
    </WrapWithHits>
  ))
  .add('with panel', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <Panel title="Price">
        <RangeInput attributeName="price" />
      </Panel>
    </WrapWithHits>
  ))
  .add('with no refinement', () => (
    <WrapWithHits searchBox={false} linkedStoryGroup="RangeInput">
      <RangeInput attributeName="price" />
      <div style={{ display: 'none' }}>
        <SearchBox defaultRefinement="ds" />
      </div>
    </WrapWithHits>
  ))
  .add('with precision of 2', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <RangeInput attributeName="price" precision={2} min={0.01} max={1.99} />
    </WrapWithHits>
  ))
  .add('with default value', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <RangeInput
        attributeName="price"
        defaultRefinement={{ min: 50, max: 200 }}
      />
    </WrapWithHits>
  ))
  .add('with min boundaries', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <RangeInput attributeName="price" min={30} />
    </WrapWithHits>
  ))
  .add('with max boundaries', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <RangeInput attributeName="price" max={500} />
    </WrapWithHits>
  ))
  .add('with min / max boundaries', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <RangeInput attributeName="price" min={30} max={500} />
    </WrapWithHits>
  ))
  .add('with boundaries and default value', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <RangeInput
        attributeName="price"
        min={30}
        max={500}
        defaultRefinement={{ min: 50, max: 200 }}
      />
    </WrapWithHits>
  ))
  .add('playground', () => (
    <WrapWithHits linkedStoryGroup="RangeInput">
      <RangeInput
        attributeName="price"
        min={number('min', 0)}
        max={number('max', 500)}
        defaultRefinement={object('default value', { min: 100, max: 400 })}
        translations={object('translations', {
          submit: ' go',
          separator: 'to',
        })}
      />
    </WrapWithHits>
  ));
