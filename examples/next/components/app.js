import React from 'react';
import PropTypes from 'prop-types';
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
  Highlight,
  Pagination,
  InstantSearch,
  createConnector,
  Menu,
} from 'react-instantsearch-dom';
import { getDisplayName } from 'react-instantsearch-core/dist/cjs/core/utils';

const connectDynamicWidgets = createConnector({
  displayName: 'AlgoliaDynamicWidgets',

  defaultProps: { transformItems: items => items },

  getProvidedProps(props, searchState, results) {
    if (!results || !results.results) {
      return { attributesToRender: [], results: null };
    }

    // retrieve the facet order out of the results:
    // results.facetOrder.map(facet => facet.attribute)
    const facetOrder = [];

    return {
      attributesToRender: props.transformItems(facetOrder, results.results),
      results,
    };
  },
});

function getAttribute(component) {
  if (component.props.attribute) {
    return component.props.attribute;
  }
  if (Array.isArray(component.props.attributes)) {
    return component.props.attributes[0];
  }
  if (component.props.children) {
    return getAttribute(React.Children.only(component.props.children));
  }

  throw new Error(
    `attribute could not be found for ${getDisplayName(component)}`
  );
}

function RenderDynamicWidgets({ children, attributesToRender, results }) {
  if (!results) {
    return (
      <div className="ais-DynamicWidgets" hidden>
        {children}
      </div>
    );
  }

  const widgets = new Map();

  React.Children.forEach(children, child => {
    const attribute = getAttribute(child);
    widgets.set(attribute, child);
  });

  // on initial render this will be empty, but React InstantSearch keeps search state for unmounted components in place, so routing works as expected here.
  return (
    <div className="ais-DynamicWidgets">
      {attributesToRender.map(attribute => widgets.get(attribute))}
    </div>
  );
}

const DynamicWidgets = connectDynamicWidgets(RenderDynamicWidgets);

const HitComponent = ({ hit }) => (
  <div className="hit">
    <div>
      <div className="hit-picture">
        <img src={`${hit.image}`} />
      </div>
    </div>
    <div className="hit-content">
      <div>
        <Highlight attribute="name" hit={hit} />
        <span> - ${hit.price}</span>
        <span> - {hit.rating} stars</span>
      </div>
      <div className="hit-type">
        <Highlight attribute="type" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={hit} />
      </div>
    </div>
  </div>
);

HitComponent.propTypes = {
  hit: PropTypes.object,
};

export default class extends React.Component {
  static propTypes = {
    searchState: PropTypes.object,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchStateChange: PropTypes.func,
    createURL: PropTypes.func,
    indexName: PropTypes.string,
    searchClient: PropTypes.object,
  };

  render() {
    return (
      <InstantSearch
        searchClient={this.props.searchClient}
        resultsState={this.props.resultsState}
        onSearchStateChange={this.props.onSearchStateChange}
        searchState={this.props.searchState}
        createURL={this.props.createURL}
        indexName={this.props.indexName}
        onSearchParameters={this.props.onSearchParameters}
        {...this.props}
      >
        <Configure hitsPerPage={12} />
        <header>
          <h1>React InstantSearch + Next.Js</h1>
          <SearchBox />
        </header>
        <main>
          <div className="filters">
            <DynamicWidgets
              transformItems={(_attributes, results) => {
                if (results._state.query === 'dog') {
                  return ['categories'];
                }
                if (results._state.query === 'lego') {
                  return ['categories', 'brand'];
                }
                return ['brand', 'hierarchicalCategories.lvl0', 'categories'];
              }}
            >
              <RefinementList attribute="brand" />
              <Menu attribute="categories" />
            </DynamicWidgets>
          </div>
          <div className="results">
            <Hits hitComponent={HitComponent} />
          </div>
        </main>
        <footer>
          <Pagination />
          <div>
            See{' '}
            <a href="https://github.com/algolia/react-instantsearch/tree/master/examples/next">
              source code
            </a>{' '}
            on github
          </div>
        </footer>
      </InstantSearch>
    );
  }
}
