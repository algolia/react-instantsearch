import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import {
  ClearRefinements,
  RefinementList,
} from '../packages/react-instantsearch/dom';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('ClearRefinements', module);

stories
  .addWithJSX(
    'with refinements to clear',
    () => (
      <WrapWithHits linkedStoryGroup="ClearRefinements">
        <div>
          <ClearRefinements />
          <div style={{ display: 'none' }}>
            <RefinementList
              attributeName="category"
              defaultRefinement={['Dining']}
            />
          </div>
        </div>
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
      <WrapWithHits linkedStoryGroup="ClearRefinements">
        <div>
          <ClearRefinements header="Header" footer="Footer" />
          <div style={{ display: 'none' }}>
            <RefinementList
              attributeName="category"
              defaultRefinement={['Dining']}
            />
          </div>
        </div>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'nothing to clear',
    () => (
      <WrapWithHits linkedStoryGroup="ClearRefinements">
        <ClearRefinements />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'clear all refinements and the query',
    () => (
      <WrapWithHits linkedStoryGroup="ClearRefinements">
        <ClearRefinements
          clearsQuery
          translations={{ reset: 'Clear refinements and query' }}
        />
        <RefinementList
          attributeName="category"
          defaultRefinement={['Dining']}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
