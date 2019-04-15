import createConnector from '../core/createConnector';
import voiceSearchHelper from '../lib/voiceSearchHelper';
import { refineValue, getCurrentRefinementValue } from '../core/indexUtils';

function getId() {
  return 'query';
}

/* tslint:disable:variable-name */
function refine(_props, searchState, nextRefinement, context) {
  /* tslint:enable:variable-name */
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
  const voiceSearch = voiceSearchHelper();

  const connector = createConnector({
    displayName: 'AlgoliaVoiceSearch',

    getProvidedProps({ searchAsYouSpeak = false } = {}) {
      voiceSearch.setSearchAsYouSpeak(searchAsYouSpeak);
      voiceSearch.setOnQueryChange(query => {
        this.refine(query);
      });
      voiceSearch.setOnStateChange(() => {
        this.context.ais.widgetsManager.update();
      });

      const {
        getState,
        isBrowserSupported,
        isListening,
        toggleListening,
      } = voiceSearch;

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
