import createConnector from '../core/createConnector';
import voiceSearchHelper from '../lib/voiceSearchHelper';
import { refineValue, getCurrentRefinementValue } from '../core/indexUtils';

function getId() {
  return 'query';
}

function refine(searchState, nextRefinement, context) {
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

export default createConnector({
  displayName: 'AlgoliaVoiceSearch',

  getProvidedProps({ searchAsYouSpeak = false } = {}) {
    if (!this._voiceSearch) {
      this._voiceSearch = voiceSearchHelper({
        searchAsYouSpeak,
        onQueryChange: query => {
          this.refine(query);
        },
        onStateChange: () => {
          this.context.ais.widgetsManager.update();
        },
      });
    }

    const {
      getState,
      isBrowserSupported,
      isListening,
      toggleListening,
    } = this._voiceSearch;

    return {
      isBrowserSupported: isBrowserSupported(),
      isListening: isListening(),
      toggleListening,
      voiceListeningState: getState(),
      searchAsYouSpeak,
    };
  },

  refine(_0, searchState, nextRefinement) {
    return refine(searchState, nextRefinement, this.context);
  },

  getSearchParameters(searchParameters, props, searchState) {
    return searchParameters.setQuery(
      getCurrentRefinement(props, searchState, this.context)
    );
  },
});
