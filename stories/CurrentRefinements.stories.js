import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import {
  CurrentRefinements,
  RefinementList,
  Toggle,
  Panel,
} from '../packages/react-instantsearch/dom';
import { withKnobs } from '@storybook/addon-knobs';
import { changeDisplayName, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';
setAddon(JSXAddon);

const stories = storiesOf('CurrentRefinements', module);

stories.addDecorator(withKnobs);

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
              defaultRefinement={['Dining']}
            />
          </div>
        </div>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with toggle',
    () => (
      <WrapWithHits linkedStoryGroup="CurrentRefinements">
        <div>
          <CurrentRefinements />
          <Toggle
            attributeName="materials"
            label="Made with solid pine"
            value={'Solid pine'}
          />
        </div>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with panel',
    () => (
      <WrapWithHits linkedStoryGroup="CurrentRefinements">
        <Panel title="Current Refinements">
          <CurrentRefinements />
          <div style={{ display: 'none' }}>
            <RefinementList
              attributeName="category"
              defaultRefinement={['Dining']}
            />
          </div>
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  )
  .addWithJSX(
    'with panel but no refinement',
    () => (
      <WrapWithHits linkedStoryGroup="CurrentRefinements">
        <Panel title="Current Refinements">
          <CurrentRefinements />
        </Panel>
      </WrapWithHits>
    ),
    { displayName: changeDisplayName }
  );
