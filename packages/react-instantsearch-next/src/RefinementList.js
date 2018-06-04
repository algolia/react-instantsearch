import React from 'react';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import createWidget from './core/createWidget';
import RefinementList from './components/RefinementList';

const mapPropsToWidgetParams = ({ attribute, limit, showMoreLimit }) => ({
  attributeName: attribute,
  limit,
  showMoreLimit,
});

const propTypes = {
  attribute: PropTypes.string.isRequired,
  limit: PropTypes.number,
  showMoreLimit: PropTypes.number,
};

export const RefinementListRenderer = createWidget({
  connector: connectRefinementList,
  mapPropsToWidgetParams,
});

export const RefinementListWidget = props => (
  <RefinementListRenderer {...props}>
    {renderArgs => <RefinementList {...renderArgs} />}
  </RefinementListRenderer>
);

RefinementListRenderer.displayName = 'Renderer(RefinementList)';
RefinementListWidget.displayName = 'Widget(RefinementList)';

RefinementListRenderer.propTypes = propTypes;
RefinementListWidget.propTypes = propTypes;
