import React from 'react';
import { storiesOf } from '@storybook/react';
import { VoiceSearch } from 'react-instantsearch-dom';
import { WrapWithHits } from './util';

const stories = storiesOf('VoiceSearch', module);

stories.add('default', () => (
  <WrapWithHits
    searchBox={false}
    hasPlayground={true}
    linkedStoryGroup="VoiceSearch"
  >
    <VoiceSearch />
  </WrapWithHits>
));
