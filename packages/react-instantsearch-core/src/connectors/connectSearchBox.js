import { connectSearchBox } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => {
  /**
   * Compatibility layer
   * Ensures compatibility between InstantSearch.js connectors and react-instantsearch API
   */
  component.getWidgetParams = props => props;

  component.getRenderParams = props => {
    const { query, refine, isSearchStalled, widgetParams } = props;
    const {
      onChange,
      onReset,
      onSubmit,
      searchAsYouType,
      autoFocus,
      focusShortcuts,
      submit,
      reset,
      loadingIndicator,
      showLoadingIndicator,
      translations,
    } = widgetParams;

    const renderParams = {
      currentRefinement: query,
      refine,
      loadingIndicator,
      reset,
      submit,
      focusShortcuts,
      autoFocus,
      searchAsYouType,
      onSubmit,
      onReset,
      onChange,
      isSearchStalled,
      showLoadingIndicator,
      translations,
    };

    return renderParams;
  };

  component.getDefaultRefinement = defaultRefinement => ({
    query: defaultRefinement,
  });

  return createConnector(connectSearchBox, component);
};
