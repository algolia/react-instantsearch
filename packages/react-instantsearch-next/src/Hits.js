import { connectHits } from 'instantsearch.js/es/connectors';
import createWidget from './core/createWidget';
import Hits from './components/Hits';

const mapPropsToWidgetParams = () => ({
  escapeHits: true,
});

export const HitsWidget = createWidget({
  connector: connectHits,
  component: Hits,
  mapPropsToWidgetParams,
});

export const HitsRenderer = createWidget({
  connector: connectHits,
  mapPropsToWidgetParams,
});

HitsWidget.displayName = 'Widget(Hits)';
HitsRenderer.displayName = 'Renderer(Hits)';
