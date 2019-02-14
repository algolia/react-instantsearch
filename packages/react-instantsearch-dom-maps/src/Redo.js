import React from 'react';
import PropTypes from 'prop-types';
import { createClassNames, translatable } from 'react-instantsearch-dom';
import GeoSearchContext from './GeoSearchContext';
import withGoogleMaps from './withGoogleMaps';

const cx = createClassNames('GeoSearch');
const RedoPropTypes = {
  googleMapsInstance: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export const Redo = ({ googleMapsInstance, translate, context }) => (
  <div className={cx('control')}>
    <button
      className={cx(
        'redo',
        !context.hasMapMoveSinceLastRefine && 'redo--disabled'
      )}
      disabled={!context.hasMapMoveSinceLastRefine}
      onClick={() => context.refineWithInstance(googleMapsInstance)}
    >
      {translate('redo')}
    </button>
  </div>
);

Redo.propTypes = {
  ...RedoPropTypes,
  context: PropTypes.shape({
    hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
    refineWithInstance: PropTypes.func.isRequired,
  }),
};

const RedoWrapper = props => (
  <GeoSearchContext.Consumer>
    {context => <Redo {...props} context={context} />}
  </GeoSearchContext.Consumer>
);

RedoWrapper.propTypes = RedoPropTypes;

export default translatable({
  redo: 'Redo search here',
})(withGoogleMaps(RedoWrapper));
