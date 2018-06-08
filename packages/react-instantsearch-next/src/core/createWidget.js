import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import Widget from './Widget';

const createWidget = ({
  connector,
  widget,
  mapPropsToWidgetParams = x => x,
}) => {
  const WidgetWithInstance = ({ children, ...props }) => (
    <Context.Consumer>
      {({ main }) => (
        <Widget
          instance={main}
          connector={connector}
          widget={widget}
          widgetParams={mapPropsToWidgetParams(props)}
        >
          {({ widgetParams, ...widgetState }) =>
            children({
              ...widgetState,
              ...props,
            })
          }
        </Widget>
      )}
    </Context.Consumer>
  );

  WidgetWithInstance.propTypes = {
    children: PropTypes.func,
  };

  WidgetWithInstance.defaultProps = {
    children: () => null,
  };

  return WidgetWithInstance;
};

export default createWidget;
