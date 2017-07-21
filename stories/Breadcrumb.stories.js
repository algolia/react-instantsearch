import React from 'react';
import { storiesOf } from '@storybook/react';
import { Breadcrumb } from '../packages/react-instantsearch/dom';
import {
  connectHierarchicalMenu,
} from '../packages/react-instantsearch/connectors';
import { withKnobs } from '@storybook/addon-knobs';
import { WrapWithHits } from './util';

const stories = storiesOf('Breadcrumb', module);
const VirtualHierarchicalMenu = connectHierarchicalMenu(() => null);

stories.addDecorator(withKnobs);

stories.add('default', () => (
  <div>
    <WrapWithHits hasPlayground={true} linkedStoryGroup="HierarchicalMenu">
      <Breadcrumb
        attributes={['category', 'sub_category', 'sub_sub_category']}
      />
      <hr />
      <VirtualHierarchicalMenu
        attributes={['category', 'sub_category', 'sub_sub_category']}
        defaultRefinement="Cooking > Kitchen textiles"
      />

    </WrapWithHits>
  </div>
));
