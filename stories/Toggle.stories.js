import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { Toggle } from '../packages/react-instantsearch/dom';
import { withKnobs } from '@storybook/addon-knobs';
import { changeDisplayName, filteredProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('Toggle', module);

stories
  .addDecorator(withKnobs)
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="Toggle">
        <Toggle
          attributeName="materials"
          label="Made with solid pine"
          value={'Solid pine'}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  )
  .addWithJSX(
    'checked by default',
    () => (
      <WrapWithHits linkedStoryGroup="Toggle">
        <Toggle
          attributeName="materials"
          label="Made with solid pine"
          value={'Solid pine'}
          defaultRefinement={true}
        />
      </WrapWithHits>
    ),
    { displayName: changeDisplayName, filterProps: filteredProps }
  );
