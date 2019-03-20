import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanelConsumer } from './Panel';

class PanelCallbackHandler extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    canRefine: PropTypes.bool.isRequired,
    setCanRefine: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (this.props.setCanRefine) {
      this.props.setCanRefine(this.props.canRefine);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.setCanRefine &&
      this.props.canRefine !== nextProps.canRefine
    ) {
      this.props.setCanRefine(nextProps.canRefine);
    }
  }

  render() {
    return this.props.children;
  }
}

const Wrapper = ({ canRefine, children }) => (
  <PanelConsumer>
    {setCanRefine => (
      <PanelCallbackHandler setCanRefine={setCanRefine} canRefine={canRefine}>
        {children}
      </PanelCallbackHandler>
    )}
  </PanelConsumer>
);

Wrapper.propTypes = {
  canRefine: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Wrapper;
