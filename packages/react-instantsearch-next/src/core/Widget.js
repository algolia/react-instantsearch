import { Component } from 'react';
import PropTypes from 'prop-types';

class Widget extends Component {
  static propTypes = {
    instance: PropTypes.object.isRequired,
    connector: PropTypes.func.isRequired,
    widgetParams: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
  };

  state = null;

  constructor(...args) {
    super(...args);

    const { instance, connector, widgetParams } = this.props;

    const createWidget = connector(state => {
      this.setState(() => state);
    });

    instance.addWidget(createWidget(widgetParams));
  }

  render() {
    const { children } = this.props;

    if (!this.state) {
      return null;
    }

    return children(this.state);
  }
}

export default Widget;
