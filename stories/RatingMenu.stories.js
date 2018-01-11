import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import {
  Configure,
  Panel,
  RatingMenu,
  SearchBox,
} from '../packages/react-instantsearch/dom';
import { object, number } from '@storybook/addon-knobs';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('RatingMenu', module);

stories
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="RatingMenu">
        <RatingMenu attributeName="rating" max={6} min={1} />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with some unavailable refinements',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="RatingMenu">
        <Configure filters="rating>=4" />
        <RatingMenu attributeName="rating" max={6} min={1} />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with filter on rating',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="RatingMenu">
        <Configure filters="rating>2" />
        <RatingMenu attributeName="rating" max={6} min={1} />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with Panel',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="RatingMenu">
        <Panel header="Rating Menu" footer="Footer">
          <RatingMenu attributeName="rating" max={6} min={1} />
        </Panel>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with Panel but no refinement',
    () => (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="RatingMenu"
      >
        <Panel header="Rating Menu" footer="Footer">
          <RatingMenu attributeName="rating" max={6} min={1} />
        </Panel>

        <div style={{ display: 'none' }}>
          <SearchBox defaultRefinement="ds" />
        </div>
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
      <WrapWithHits linkedStoryGroup="RatingMenu">
        <RatingMenu
          attributeName="rating"
          max={number('max', 6)}
          translations={object('translations', { ratingLabel: ' & Up' })}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
