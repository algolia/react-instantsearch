import createConnector from '../core/createConnector';
import voiceSearchHelper from '../lib/voiceSearchHelper';

export default Composed => {
  const helper = voiceSearchHelper({});

  const { getState, isBrowserSupported, isListening, toggleListening } = helper;

  const connector = createConnector({
    displayName: 'AlgoliaVoiceSearch',

    getProvidedProps() {
      return {
        isBrowserSupported,
        isListening,
        toggleListening,
        voiceListeningState: getState(),
        searchAsYouSpeak: undefined,
      };
    },
  });

  return connector(Composed);
};
