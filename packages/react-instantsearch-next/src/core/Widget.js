import { Component } from 'react';
import PropTypes from 'prop-types';

const createConnectorFromWidget = definition => renderer => () => ({
  ...definition,
  init(...initArgs) {
    if (definition.init) {
      return renderer(definition.init(...initArgs));
    }

    return renderer(...initArgs);
  },
  render(...renderArgs) {
    if (definition.render) {
      return renderer(definition.render(...renderArgs));
    }

    return renderer(...renderArgs);
  },
});

class Widget extends Component {
  static propTypes = {
    instance: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    connector: PropTypes.func,
    widgetParams: PropTypes.object,
    widget: PropTypes.shape({
      getConfigutation: PropTypes.func,
      init: PropTypes.func,
      render: PropTypes.func,
      dispose: PropTypes.func,
    }),
  };

  state = null;

  componentDidMount() {
    const { instance, connector, widget, widgetParams } = this.props;

    const connect = widget ? createConnectorFromWidget(widget) : connector;

    const createWidget = connect(
      state => {
        this.setState(() => state);
      },
      () => {
        // Noop
      }
    );

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
