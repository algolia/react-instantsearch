import { isEqual } from 'lodash';
import React, { Component, ReactType, WeakValidationMap } from 'react';
import { shallowEqual, getDisplayName, removeEmptyKey } from './utils';
import {
  InstantSearchConsumer,
  InstantSearchContext,
  IndexConsumer,
  IndexContext,
} from './context';
import {
  SearchParameters,
  SearchResults,
  SearchState,
  SearchForFacetValuesResults,
  SearchMetadata,
} from '../types';

export type ConnectorDescription<TWidgetProps = {}> = {
  /**
   * Name of the Connector, in PascalCase
   */
  displayName: string;

  /**
   * a function to filter the local state
   */
  refine?: (
    props: ConnectedProps<TWidgetProps>,
    searchState: SearchState,
    ...args: any[]
  ) => SearchState;

  /**
   * function transforming the local state to a SearchParameters
   */
  getSearchParameters?: (
    searchParameters: SearchParameters,
    props: ConnectedProps<TWidgetProps>,
    searchState: SearchState
  ) => SearchParameters;

  /**
   * metadata of the widget (for current refinements)
   */
  getMetadata?: (
    props: ConnectedProps<TWidgetProps>,
    searchState: SearchState
  ) => SearchMetadata;

  /**
   * hook after the state has changed
   */
  transitionState?: (
    nextProps: ConnectedProps<TWidgetProps>,
    prevSearchState: SearchState,
    nextSearchState: SearchState
  ) => SearchState;

  /**
   * transform the state into props passed to the wrapped component.
   * Receives (props, widgetStates, searchState, metadata) and returns the local state.
   */
  getProvidedProps: (
    props: ConnectedProps<TWidgetProps>,
    searchState: SearchState,
    searchResults: SearchResults,
    metadata: SearchMetadata,
    resultsFacetValues: SearchForFacetValuesResults
  ) => TWidgetProps;

  /**
   * hook when the widget will unmount. Receives (props, searchState) and return a cleaned state.
   */
  cleanUp?: (
    props: ConnectedProps<TWidgetProps>,
    searchState: SearchState
  ) => SearchState;

  searchForFacetValues?: (
    props: ConnectedProps<TWidgetProps>,
    searchState: SearchState,
    ...args: any[]
  ) => any;

  /**
   * Function that will be called on shouldComponentUpdate of the connector
   */
  shouldComponentUpdate?: (
    props: ConnectedProps<TWidgetProps>,
    nextProps: ConnectedProps<TWidgetProps>,
    state: ConnectedState<TWidgetProps>,
    nextState: ConnectedState<TWidgetProps>
  ) => boolean;

  /**
   * PropTypes forwarded to the wrapped component.
   */
  propTypes?: WeakValidationMap<TWidgetProps>;

  defaultProps?: Partial<TWidgetProps>;
};

type ContextProps = {
  contextValue: InstantSearchContext;
  indexContextValue: IndexContext;
};

export type ConnectedProps<TWidgetProps> = TWidgetProps & ContextProps;

type ConnectedState<TWidgetProps> = {
  providedProps: TWidgetProps;
};

/**
 * Connectors are the HOC used to transform React components
 * into InstantSearch widgets.
 * In order to simplify the construction of such connectors
 * `createConnector` takes a description and transform it into
 * a connector.
 * @param {ConnectorDescription} connectorDesc the description of the connector
 * @return {Connector} a function that wraps a component into
 * an instantsearch connected one.
 */
export function createConnectorWithoutContext<TWidgetProps = {}>(
  connectorDesc: ConnectorDescription<TWidgetProps>
) {
  if (!connectorDesc.displayName) {
    throw new Error(
      '`createConnector` requires you to provide a `displayName` property.'
    );
  }

  const isWidget =
    typeof connectorDesc.getSearchParameters === 'function' ||
    typeof connectorDesc.getMetadata === 'function' ||
    typeof connectorDesc.transitionState === 'function';

  return (Composed: ReactType) => {
    type ConnectorProps = ConnectedProps<TWidgetProps>;
    type ConnectorState = ConnectedState<TWidgetProps>;

    class Connector extends Component<ConnectorProps, ConnectorState> {
      static displayName = `${connectorDesc.displayName}(${getDisplayName(
        Composed
      )})`;
      static propTypes = connectorDesc.propTypes;
      static defaultProps = connectorDesc.defaultProps;

      unsubscribe?: () => void;
      unregisterWidget?: () => void;

      isUnmounting = false;

      state: ConnectorState = {
        providedProps: this.getProvidedProps(this.props),
      };

      componentWillMount() {
        if (connectorDesc.getSearchParameters) {
          this.props.contextValue.onSearchParameters(
            connectorDesc.getSearchParameters.bind(this),
            {
              ais: this.props.contextValue,
              multiIndexContext: this.props.indexContextValue,
            },
            this.props
          );
        }
      }

      componentDidMount() {
        this.unsubscribe = this.props.contextValue.store.subscribe(() => {
          if (!this.isUnmounting) {
            this.setState({
              providedProps: this.getProvidedProps(this.props),
            });
          }
        });

        if (isWidget) {
          this.unregisterWidget = this.props.contextValue.widgetsManager.registerWidget(
            this
          );
        }
      }

      componentWillReceiveProps(nextProps: ConnectorProps) {
        if (!isEqual(this.props, nextProps)) {
          this.setState({
            providedProps: this.getProvidedProps(nextProps),
          });

          if (isWidget) {
            this.props.contextValue.widgetsManager.update();

            if (typeof connectorDesc.transitionState === 'function') {
              this.props.contextValue.onSearchStateChange(
                connectorDesc.transitionState.call(
                  this,
                  nextProps,
                  this.props.contextValue.store.getState().widgets,
                  // @TODO: this is used as "prev" & "next", but is both next
                  this.props.contextValue.store.getState().widgets
                )
              );
            }
          }
        }
      }

      shouldComponentUpdate(
        nextProps: ConnectorProps,
        nextState: ConnectorState
      ) {
        if (typeof connectorDesc.shouldComponentUpdate === 'function') {
          return connectorDesc.shouldComponentUpdate.call(
            this,
            this.props,
            nextProps,
            this.state,
            nextState
          );
        }

        const propsEqual = shallowEqual(this.props, nextProps);

        if (
          this.state.providedProps === null ||
          nextState.providedProps === null
        ) {
          if (this.state.providedProps === nextState.providedProps) {
            return !propsEqual;
          }
          return true;
        }

        return (
          !propsEqual ||
          !shallowEqual(this.state.providedProps, nextState.providedProps)
        );
      }

      componentWillUnmount() {
        this.isUnmounting = true;

        if (this.unsubscribe) {
          this.unsubscribe();
        }

        if (this.unregisterWidget) {
          this.unregisterWidget();

          if (typeof connectorDesc.cleanUp === 'function') {
            const nextState = connectorDesc.cleanUp.call(
              this,
              this.props,
              this.props.contextValue.store.getState().widgets
            );

            this.props.contextValue.store.setState({
              ...this.props.contextValue.store.getState(),
              widgets: nextState,
            });

            this.props.contextValue.onSearchStateChange(
              removeEmptyKey(nextState)
            );
          }
        }
      }

      getProvidedProps(props: ConnectorProps) {
        const {
          widgets,
          results,
          resultsFacetValues,
          searching,
          searchingForFacetValues,
          isSearchStalled,
          metadata,
          error,
        } = this.props.contextValue.store.getState();

        const searchResults = {
          results,
          searching,
          searchingForFacetValues,
          isSearchStalled,
          error,
        };

        return connectorDesc.getProvidedProps.call(
          this,
          props,
          widgets,
          searchResults,
          metadata,
          // @MAJOR: move this attribute on the `searchResults` it doesn't
          // makes sense to have it into a separate argument. The search
          // flags are on the object why not the results?
          resultsFacetValues
        );
      }

      getSearchParameters(searchParameters: SearchParameters) {
        if (typeof connectorDesc.getSearchParameters === 'function') {
          return connectorDesc.getSearchParameters.call(
            this,
            searchParameters,
            this.props,
            this.props.contextValue.store.getState().widgets
          );
        }

        return null;
      }

      getMetadata(nextWidgetsState) {
        if (typeof connectorDesc.getMetadata === 'function') {
          return connectorDesc.getMetadata.call(
            this,
            this.props,
            nextWidgetsState
          );
        }

        return {};
      }

      transitionState(prevWidgetsState, nextWidgetsState) {
        if (typeof connectorDesc.transitionState === 'function') {
          return connectorDesc.transitionState.call(
            this,
            this.props,
            prevWidgetsState,
            nextWidgetsState
          );
        }

        return nextWidgetsState;
      }

      refine = (...args: any[]) => {
        this.props.contextValue.onInternalStateUpdate(
          // refine will always be defined here because the prop is only given conditionally
          connectorDesc.refine!.call(
            this,
            this.props,
            this.props.contextValue.store.getState().widgets,
            ...args
          )
        );
      };

      createURL = (...args: any[]) =>
        this.props.contextValue.createHrefForState(
          // refine will always be defined here because the prop is only given conditionally
          connectorDesc.refine!.call(
            this,
            this.props,
            this.props.contextValue.store.getState().widgets,
            ...args
          )
        );

      searchForFacetValues = (...args: any[]) => {
        this.props.contextValue.onSearchForFacetValues(
          // searchForFacetValues will always be defined here because the prop is only given conditionally
          connectorDesc.searchForFacetValues!.call(
            this,
            this.props,
            this.props.contextValue.store.getState().widgets,
            ...args
          )
        );
      };

      render() {
        const { contextValue, ...props } = this.props;
        const { providedProps } = this.state;

        if (providedProps === null) {
          return null;
        }

        const refineProps =
          typeof connectorDesc.refine === 'function'
            ? { refine: this.refine, createURL: this.createURL }
            : {};

        const searchForFacetValuesProps =
          typeof connectorDesc.searchForFacetValues === 'function'
            ? { searchForItems: this.searchForFacetValues }
            : {};

        return (
          <Composed
            {...props}
            {...providedProps}
            {...refineProps}
            {...searchForFacetValuesProps}
          />
        );
      }
    }

    return Connector;
  };
}

function createConnectorWithContext<TWidgetProps = {}>(
  connectorDesc: ConnectorDescription<TWidgetProps>
) {
  return (Composed: ReactType) => {
    const Connector = createConnectorWithoutContext(connectorDesc)(Composed);

    const ConnectorWrapper: React.FC<any> = props => (
      <InstantSearchConsumer>
        {contextValue => (
          <IndexConsumer>
            {indexContextValue => (
              <Connector
                contextValue={contextValue}
                indexContextValue={indexContextValue}
                {...props}
              />
            )}
          </IndexConsumer>
        )}
      </InstantSearchConsumer>
    );

    return ConnectorWrapper;
  };
}

export default createConnectorWithContext;
