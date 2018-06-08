import { connectConfigure } from 'react-instantsearch-vanilla/dist/connectors';
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
