import React from 'react';
import PropTypes from 'prop-types';
import { createClassNames, translatable } from 'react-instantsearch-dom';
import GeoSearchContext from './GeoSearchContext';
import withGoogleMaps from './withGoogleMaps';

const cx = createClassNames('GeoSearch');
const ControlPropTypes = {
  googleMapsInstance: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export const Control = ({ googleMapsInstance, translate, context }) => (
  <div className={cx('control')}>
    {context.isRefineOnMapMove || !context.hasMapMoveSinceLastRefine ? (
      <label className={cx('label')}>
        <input
          className={cx('input')}
          type="checkbox"
          checked={context.isRefineOnMapMove}
          onChange={context.toggleRefineOnMapMove}
        />
        {translate('control')}
      </label>
    ) : (
      <button
        className={cx('redo')}
        onClick={() => context.refineWithInstance(googleMapsInstance)}
      >
        {translate('redo')}
      </button>
    )}
  </div>
);

Control.propTypes = {
  ...ControlPropTypes,
  context: PropTypes.shape({
    isRefineOnMapMove: PropTypes.bool.isRequired,
    toggleRefineOnMapMove: PropTypes.func.isRequired,
    hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
    refineWithInstance: PropTypes.func.isRequired,
  }),
};

const ControlWrapper = props => (
  <GeoSearchContext.Consumer>
    {context => <Control {...props} context={context} />}
  </GeoSearchContext.Consumer>
);

ControlWrapper.propTypes = ControlPropTypes;

export default translatable({
  control: 'Search as I move the map',
  redo: 'Redo search here',
})(withGoogleMaps(ControlWrapper));
