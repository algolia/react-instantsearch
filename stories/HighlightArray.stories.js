import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { Stats } from '../packages/react-instantsearch/dom';
import { displayName, filterProps, WrapWithHits } from './util';

import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('HighlightWithArray', module);

stories.addWithJSX(
  'default',
  () => (
    <WrapWithHits
      appId="KY4PR9ORUL"
      apiKey="a5ca312adab3b79e14054154efa00b37"
      indexName="highlight_array"
    >
      <div />
    </WrapWithHits>
  ),
  {
    displayName,
    filterProps,
  }
);
