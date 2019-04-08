import { Component } from 'react';
import PropTypes from 'prop-types';

class PanelCallbackHandler extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    canRefine: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    setCanRefine: PropTypes.func,
  };

  componentDidMount() {
    if (this.context.setCanRefine) {
      this.context.setCanRefine(this.props.canRefine);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.context.setCanRefine &&
      prevProps.canRefine !== this.props.canRefine
    ) {
      this.context.setCanRefine(this.props.canRefine);
    }
  }

  render() {
    return this.props.children;
  }
}

export default PanelCallbackHandler;
