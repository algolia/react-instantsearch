import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import Widget from './Widget';

const createWidget = ({ mapPropsToWidgetParams, connector, component }) => {
  const WidgetWithInstance = ({ children, ...props }) => (
    <Context.Consumer>
      {instance => (
        <Widget
          instance={instance}
          connector={connector}
          widgetParams={mapPropsToWidgetParams(props)}
        >
          {({ widgetParams, ...widgetState }) => {
            if (component) {
              return createElement(component, {
                ...widgetState,
                ...props,
              });
            }

            if (children) {
              return children({
                ...widgetState,
                ...props,
              });
            }

            return null;
          }}
        </Widget>
      )}
    </Context.Consumer>
  );

  WidgetWithInstance.propTypes = {
    children: PropTypes.func,
  };

  return WidgetWithInstance;
};

export default createWidget;
