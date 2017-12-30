import PropTypes from 'prop-types';

const AutoHideContainer = ({ canRefine, children, autoHideContainer }) =>
  !autoHideContainer || canRefine ? children : null;

AutoHideContainer.propTypes = {
  canRefine: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  autoHideContainer: PropTypes.bool,
};

AutoHideContainer.defaultProps = {
  autoHideContainer: false,
};

export default AutoHideContainer;
