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

export const RefinementListWidget = createWidget({
  connector: connectRefinementList,
  component: RefinementList,
  mapPropsToWidgetParams,
});

export const RefinementListRenderer = createWidget({
  connector: connectRefinementList,
  mapPropsToWidgetParams,
});

RefinementListWidget.displayName = 'Widget(RefinementList)';
RefinementListRenderer.displayName = 'Renderer(RefinementList)';

RefinementListWidget.propTypes = propTypes;
RefinementListRenderer.propTypes = propTypes;
