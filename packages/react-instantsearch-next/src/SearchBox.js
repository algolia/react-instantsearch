import { connectSearchBox } from 'instantsearch.js/es/connectors';
import createWidget from './core/createWidget';
import SearchBox from './components/SearchBox';

const mapPropsToWidgetParams = () => ({});

export const SearchBoxWidget = createWidget({
  connector: connectSearchBox,
  component: SearchBox,
  mapPropsToWidgetParams,
});

export const SearchBoxRenderer = createWidget({
  connector: connectSearchBox,
  mapPropsToWidgetParams,
});

SearchBoxWidget.displayName = 'Widget(SearchBox)';
SearchBoxRenderer.displayName = 'Renderer(SearchBox)';
