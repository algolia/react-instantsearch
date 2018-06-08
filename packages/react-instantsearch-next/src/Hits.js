import React from 'react';
import { connectHits } from 'react-instantsearch-vanilla/dist/connectors';
import createWidget from './core/createWidget';
import Hits from './components/Hits';

const mapPropsToWidgetParams = () => ({
  escapeHits: true,
});

export const HitsRenderer = createWidget({
  connector: connectHits,
  mapPropsToWidgetParams,
});

export const HitsWidget = props => (
  <HitsRenderer {...props}>
    {renderArgs => <Hits {...renderArgs} />}
  </HitsRenderer>
);

HitsRenderer.displayName = 'Renderer(Hits)';
HitsWidget.displayName = 'Widget(Hits)';
