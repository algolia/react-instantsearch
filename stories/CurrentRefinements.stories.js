import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import {
  CurrentRefinements,
  RefinementList,
  Toggle,
} from '../packages/react-instantsearch/dom';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';
setAddon(JSXAddon);

const stories = storiesOf('CurrentRefinements', module);

stories
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="CurrentRefinements">
        <div>
          <CurrentRefinements />
          <div style={{ display: 'none' }}>
            <RefinementList
              attributeName="category"
              defaultRefinement={['Dining', 'Other']}
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
      <WrapWithHits linkedStoryGroup="CurrentRefinements">
        <CurrentRefinements header="Current refinements" footer="Footer" />
        <div style={{ display: 'none' }}>
          <RefinementList
            attributeName="category"
            defaultRefinement={['Dining']}
          />
        </div>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'hidden without refinement',
    () => (
      <WrapWithHits linkedStoryGroup="CurrentRefinements">
        <CurrentRefinements header="Current refinements" autoHideContainer />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'visible without refinement',
    () => (
      <WrapWithHits linkedStoryGroup="CurrentRefinements">
        <CurrentRefinements header="Current refinements" />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with toggle',
    () => (
      <WrapWithHits linkedStoryGroup="CurrentRefinements">
        <CurrentRefinements />
        <Toggle
          attributeName="materials"
          label="Made with solid pine"
          value={'Solid pine'}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
