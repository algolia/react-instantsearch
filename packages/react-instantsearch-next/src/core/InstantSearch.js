import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createInstantSearch from 'react-instantsearch-vanilla';
import Context from './Context';

class InstantSearch extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    searchClient: PropTypes.shape({
      search: PropTypes.func.isRequired,
      searchForFacetValues: PropTypes.func.isRequired,
    }).isRequired,
    indexName: PropTypes.string.isRequired,
    context: PropTypes.shape({
      main: PropTypes.object.isRequired,
      addInstance: PropTypes.func.isRequired,
    }),
  };

  indices = [];

  // It doesn't work with the StrictMode
  // we call createInstantSearch two times
  constructor(...args) {
    super(...args);

    const instance = createInstantSearch({
      searchClient: this.props.searchClient,
      indexName: this.props.indexName,
      searchFunction: this.applyMultiInstanceSearch.bind(this),
    });

    this.addInstance = this.addInstance.bind(this);

    this.state = {
      main: instance,
      addInstance: this.addInstance,
    };

    if (this.props.context) {
      this.props.context.addInstance({
        indexName: this.props.indexName,
        instance,
      });
    }
  }

  componentDidMount() {
    // Avoid to start them as soon as possible
    // it should be handled internally it will
    // allow to trigger less requests on start
    // - idea: batch the starts
    // - idea: ...
    this.state.main.start();
  }

  addInstance(description) {
    this.indices.push(description);
  }

  applyMultiInstanceSearch(helper) {
    const { main } = this.state;

    // Manage all the instances top level to allow a
    // deep nested child to recreate the hierarchy
    this.indices.forEach(({ instance }) => {
      const parentWidgetState = this.getWidgetState(
        main.widgets,
        main.helper.getState()
      );

      const currentWidgetState = this.getWidgetState(
        instance.widgets,
        instance.helper.getState()
      );

      instance.helper.setState(
        this.getWidgetSearchParameters(
          main.widgets,
          instance.helper.getState(),
          {
            ...parentWidgetState,
            ...currentWidgetState,
          }
        )
      );

      instance.helper.search();
    });

    helper.search();
  }

  // Could be implemented in InstantSearch
  getWidgetState(widgets, searchParameters) {
    return widgets.reduce((acc, widget) => {
      if (!widget.getWidgetState) {
        return acc;
      }

      return widget.getWidgetState(acc, {
        searchParameters,
      });
    }, {});
  }

  // Could be implemented in InstantSearch
  getWidgetSearchParameters(widgets, searchParameters, uiState) {
    return widgets.reduce((acc, widget) => {
      if (!widget.getWidgetSearchParameters) {
        return acc;
      }

      return widget.getWidgetSearchParameters(acc, {
        uiState,
      });
    }, searchParameters);
  }

  render() {
    return (
      // prettier-ignore
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default props => (
  <Context.Consumer>
    {context => <InstantSearch {...props} context={context} />}
  </Context.Consumer>
);
