import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {
  InstantSearch,
  HierarchicalMenu,
  Menu,
  Pagination,
  PoweredBy,
  RatingMenu,
  RefinementList,
  SearchBox,
  ClearRefinements,
  Highlight,
  InfiniteHits,
  getInfiniteHitsSessionStorageCache,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : '';
const urlToSearchState = location => qs.parse(location.search.slice(1));

function Product({ hit }) {
  return (
    <div>
      <span>#{hit.__position}. </span>
      <Highlight attribute="name" hit={hit} />
      <p>
        <a href="https://google.com">Details</a>
      </p>
    </div>
  );
}
Product.propTypes = {
  hit: PropTypes.object.isRequired,
};

class App extends Component {
  state = {
    searchState: urlToSearchState(this.props.location),
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({ searchState: urlToSearchState(this.props.location) });
    }
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      this.props.history.push(
        searchStateToUrl(this.props, searchState),
        searchState
      );
    }, updateAfter);

    this.setState({ searchState });
  };

  render() {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createURL}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <SearchBox />
            <PoweredBy />
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ padding: '0px 20px' }}>
              <p>Hierarchical Menu</p>
              <HierarchicalMenu
                id="categories"
                attributes={[
                  'hierarchicalCategories.lvl0',
                  'hierarchicalCategories.lvl1',
                  'hierarchicalCategories.lvl2',
                ]}
              />
              <p>Menu</p>
              <Menu attribute="type" />
              <p>Refinement List</p>
              <RefinementList attribute="brand" />
              <p>Range Ratings</p>
              <RatingMenu attribute="rating" max={6} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <ClearRefinements />
              </div>
              <div>
                <InfiniteHits
                  hitComponent={Product}
                  cache={getInfiniteHitsSessionStorageCache()}
                />
              </div>
              <div style={{ alignSelf: 'center' }}>
                <Pagination showLast={true} />
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default App;
