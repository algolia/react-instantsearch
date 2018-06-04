import React from 'react';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import createWidget from './core/createWidget';
import SearchBox from './components/SearchBox';

const mapPropsToWidgetParams = () => ({});

export const SearchBoxRenderer = createWidget({
  connector: connectSearchBox,
  mapPropsToWidgetParams,
});

export const SearchBoxWidget = props => (
  <SearchBoxRenderer {...props}>
    {renderArgs => <SearchBox {...renderArgs} />}
  </SearchBoxRenderer>
);

SearchBoxRenderer.displayName = 'Renderer(SearchBox)';
SearchBoxWidget.displayName = 'Widget(SearchBox)';
