import React, { PureComponent } from 'react';

import { getDisplayName } from './utils';

import equal from 'fast-deep-equal/es6/react';

import {
  InstantSearchConsumer,
  IndexProvider,
  IndexConsumer,
} from '../core/context';

type State = {
  [key: string]: any;
};

type Props = {
  instantSearchInstance: any;
  indexInstance?: any;
  defaultRefinement: string;
};

export default (connector, WidgetComponent) => {
  class ConnectedWidgetComponent extends PureComponent<Props, State> {
    static displayName = `${connector.name}(${getDisplayName(
      WidgetComponent
    )})`;

    factory: any;

    widget: any;

    constructor(props) {
      super(props);

      this._updateState = this._updateState.bind(this);

      this.factory = connector(this._updateState);

      const widgetParams = WidgetComponent.getWidgetParams
        ? WidgetComponent.getWidgetParams(this.props)
        : this.props;

      this.widget = this.factory(widgetParams);

      this._updateInitialUiState();

      this._getParentIndex().addWidgets([this.widget]);
    }

    componentDidUpdate(prevProps) {
      if (equal(prevProps, this.props)) {
        return;
      }

      this._getParentIndex().removeWidgets([this.widget]);

      const widgetParams = WidgetComponent.getWidgetParams
        ? WidgetComponent.getWidgetParams(this.props)
        : this.props;

      this.widget = this.factory(widgetParams);

      this._updateInitialUiState();

      this._getParentIndex().addWidgets([this.widget]);
    }

    componentWillUnmount() {
      this._getParentIndex().removeWidgets([this.widget]);
    }

    render() {
      if (!this.state && ConnectedWidgetComponent.displayName !== 'Index') {
        return null;
      }

      const renderParams = WidgetComponent.getRenderParams
        ? WidgetComponent.getRenderParams(this.state)
        : this.state;
      if (ConnectedWidgetComponent.displayName === 'Index') {
        return (
          <IndexProvider value={this.widget}>
            <WidgetComponent {...renderParams} />
          </IndexProvider>
        );
      } else {
        return <WidgetComponent {...renderParams} />;
      }
    }

    _updateState(newState) {
      // First synchronous call made to the widget render function in the constructor
      // so it is correct to directly mutate the state here
      if (!this.state) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = newState;
        return;
      }
      // Subsequent calls to the render function
      this.setState(newState);
    }

    _updateInitialUiState() {
      if (!this.props.defaultRefinement) {
        return;
      }

      if (!WidgetComponent.getDefaultRefinement) {
        console.warn(`defaultRefinement is not handled for ${connector.name}`);
        return;
      }

      const { indexName } = this.props.instantSearchInstance;

      const originalState = this.props.instantSearchInstance._initialUiState;

      const defaultRefinementState = WidgetComponent.getDefaultRefinement(
        this.props.defaultRefinement
      );

      const newState = {
        ...originalState,
        [indexName]: {
          ...originalState[indexName],
          ...defaultRefinementState,
        },
      };

      this.props.instantSearchInstance._initialUiState = newState;
    }

    _getParentIndex() {
      const { instantSearchInstance, indexInstance } = this.props;
      return indexInstance || instantSearchInstance;
    }
  }

  return props => (
    <InstantSearchConsumer>
      {instantSearchInstance => (
        <IndexConsumer>
          {indexInstance => (
            <ConnectedWidgetComponent
              indexInstance={indexInstance}
              instantSearchInstance={instantSearchInstance}
              {...props}
            />
          )}
        </IndexConsumer>
      )}
    </InstantSearchConsumer>
  );
};
