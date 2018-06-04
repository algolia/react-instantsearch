import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import Widget from './Widget';

const createWidget = ({ connector, mapPropsToWidgetParams = () => ({}) }) => {
  const WidgetWithInstance = ({ children, ...props }) => (
    <Context.Consumer>
      {instance => (
        <Widget
          instance={instance}
          connector={connector}
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
    children: PropTypes.func.isRequired,
  };

  return WidgetWithInstance;
};

export default createWidget;
