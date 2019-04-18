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
  .add('with a custom button text', () => {
    const style = window.document.createElement('style');
    window.document.head.appendChild(style);
    [
      `.custom-button-story .ais-VoiceSearch-button:hover {
        background: inherit;
      }`,
    ].forEach(rule => (style.sheet as CSSStyleSheet).insertRule(rule));
    return (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="VoiceSearch"
      >
        <div className="custom-button-story">
          <VoiceSearch
            buttonComponent={({ isListening }) => (isListening ? '⏹' : '🎙')}
          />
        </div>
      </WrapWithHits>
    );
  })
  .add('with full status', () => {
    const Status = ({
      status,
      errorCode,
      isListening,
      transcript,
      isSpeechFinal,
      isBrowserSupported,
    }) => {
      return (
        <div>
          <p>status: {status}</p>
          <p>errorCode: {errorCode}</p>
          <p>isListening: {isListening ? 'true' : 'false'}</p>
          <p>transcript: {transcript}</p>
          <p>isSpeechFinal: {isSpeechFinal ? 'true' : 'false'}</p>
          <p>isBrowserSupported: {isBrowserSupported ? 'true' : 'false'}</p>
        </div>
      );
    };

    return (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="VoiceSearch"
      >
        <VoiceSearch statusComponent={Status} />
      </WrapWithHits>
    );
  })
  .add('search as you speak', () => {
    const Status = ({
      status,
      errorCode,
      isListening,
      transcript,
      isSpeechFinal,
      isBrowserSupported,
    }) => {
      return (
        <div>
          <p>status: {status}</p>
          <p>errorCode: {errorCode}</p>
          <p>isListening: {isListening ? 'true' : 'false'}</p>
          <p>transcript: {transcript}</p>
          <p>isSpeechFinal: {isSpeechFinal ? 'true' : 'false'}</p>
          <p>isBrowserSupported: {isBrowserSupported ? 'true' : 'false'}</p>
        </div>
      );
    };
    return (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="VoiceSearch"
      >
        <VoiceSearch searchAsYouSpeak={true} statusComponent={Status} />
      </WrapWithHits>
    );
  })
  .add('example of dynamic UI working with SearchBox', () => {
    const style = window.document.createElement('style');
    window.document.head.appendChild(style);
    [
      `.custom-ui .ais-VoiceSearch-button {
        position: absolute;
        right: 43px;
        top: 53px;
        z-index: 3;
      }`,
      `.custom-ui .ais-VoiceSearch-status .layer {
        position: absolute;
        background: rgba(255, 255, 255, 0.95);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        align-items: center;
        justify-content: center;
        display: none;
      }`,
      `.custom-ui .ais-VoiceSearch-status .layer.listening-true {
        display: flex;
      }`,
      `.custom-ui .ais-VoiceSearch-status .layer span {
        font-size: 2rem;
        color: #555;
      }`,
    ].forEach(rule => (style.sheet as CSSStyleSheet).insertRule(rule));

    const Status = ({ isListening, transcript }) => {
      return (
        <div className={`layer listening-${isListening}`}>
          <span>{transcript}</span>
        </div>
      );
    };

    return (
      <WrapWithHits
        searchBox={false}
        hasPlayground={true}
        linkedStoryGroup="VoiceSearch"
      >
        <div className="custom-ui">
          <VoiceSearch statusComponent={Status} />
          <SearchBox reset={null} />
        </div>
      </WrapWithHits>
    );
  });
