import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  HierarchicalMenu,
  Breadcrumb,
  Panel,
  SearchBox,
} from '../packages/react-instantsearch/dom';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { WrapWithHits } from './util';

const stories = storiesOf('Breadcrumb', module);

stories.addDecorator(withKnobs);

stories.add('default', () => (
  <div>
    <WrapWithHits hasPlayground={true} linkedStoryGroup="HierarchicalMenu">
      <Breadcrumb
        attributes={['category', 'sub_category', 'sub_sub_category']}
      />
      <hr />
      <HierarchicalMenu
        attributes={['category', 'sub_category', 'sub_sub_category']}
        defaultRefinement="Cooking > Kitchen textiles"
      />
    </WrapWithHits>
  </div>
));
