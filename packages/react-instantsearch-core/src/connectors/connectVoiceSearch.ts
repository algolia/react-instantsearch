import createConnector from '../core/createConnector';
import voiceSearchHelper from '../lib/voiceSearchHelper';
import { refineValue, getCurrentRefinementValue } from '../core/indexUtils';

function getId() {
  return 'query';
}

function refine(props, searchState, nextRefinement, context) {
  const id = getId();
  const nextValue = { [id]: nextRefinement };
  const resetPage = true;
  return refineValue(searchState, nextValue, context, resetPage);
}

function getCurrentRefinement(props, searchState, context) {
  const id = getId();
  const refinementsCallback = currentRefinement => currentRefinement || '';
  return getCurrentRefinementValue(
    props,
    searchState,
    context,
    id,
    '',
    refinementsCallback
  );
}

export default Composed => {
  const helper = voiceSearchHelper();

  const connector = createConnector({
    displayName: 'AlgoliaVoiceSearch',

    getProvidedProps({ searchAsYouSpeak = false } = {}) {
      helper.setSearchAsYouSpeak(searchAsYouSpeak);
      helper.setOnQueryChange(query => {
        this.refine(query);
      });
      helper.setOnStateChange(() => {
        this.context.ais.widgetsManager.update();
      });

      const {
        getState,
        isBrowserSupported,
        isListening,
        toggleListening,
      } = helper;

      return {
        isBrowserSupported,
        isListening,
        toggleListening,
        voiceListeningState: getState(),
        searchAsYouSpeak,
      };
    },

    refine(props, searchState, nextRefinement) {
      return refine(props, searchState, nextRefinement, this.context);
    },

    getSearchParameters(searchParameters, props, searchState) {
      return searchParameters.setQuery(
        getCurrentRefinement(props, searchState, this.context)
      );
    },
  });

  return connector(Composed);
};
