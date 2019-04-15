import React from 'react';
import { storiesOf } from '@storybook/react';
import { VoiceSearch, SearchBox } from 'react-instantsearch-dom';
import { WrapWithHits } from './util';

const stories = storiesOf('VoiceSearch', module);

stories
  .add('default', () => (
    <WrapWithHits
      searchBox={false}
      hasPlayground={true}
      linkedStoryGroup="VoiceSearch"
    >
      <p style={{ color: '#999', fontStyle: 'italic' }}>
        To see this button disabled, test it on unsupported browsers like
        Safari, Firefox, etc.
      </p>
      <VoiceSearch />
    </WrapWithHits>
  ))
  .add('without status', () => (
    <WrapWithHits
      searchBox={false}
      hasPlayground={true}
      linkedStoryGroup="VoiceSearch"
    >
      <VoiceSearch statusComponent={() => null} />
    </WrapWithHits>
  ))
  .add('with a SearchBox', () => (
    <WrapWithHits
      searchBox={false}
      hasPlayground={true}
      linkedStoryGroup="VoiceSearch"
    >
      <VoiceSearch />
      <SearchBox />
    </WrapWithHits>
  ))
  .add('with a custom button text', () => (
    <WrapWithHits
      searchBox={false}
      hasPlayground={true}
      linkedStoryGroup="VoiceSearch"
    >
      <VoiceSearch
        buttonComponent={({ isListening }) => (isListening ? 'Stop' : 'Start')}
      />
    </WrapWithHits>
  ));
