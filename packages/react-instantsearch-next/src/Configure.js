import { connectConfigure } from 'instantsearch.js/es/connectors';
import createWidget from './core/createWidget';

const mapPropsToWidgetParams = props => ({
  searchParameters: props,
});

export const ConfigureRenderer = createWidget({
  connector: connectConfigure,
  mapPropsToWidgetParams,
});

export const ConfigureWidget = ConfigureRenderer;

ConfigureRenderer.displayName = 'Renderer(Configure)';
ConfigureWidget.displayName = 'Widget(Configure)';
