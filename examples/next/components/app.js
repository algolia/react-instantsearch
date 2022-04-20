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
} from 'react-instantsearch-dom';

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

function App(props) {
  return (
    <InstantSearch {...props}>
      <Configure hitsPerPage={12} />
      <header>
        <h1>React InstantSearch + Next.js</h1>
        <SearchBox />
      </header>
      <main>
        <div className="menu">
          <RefinementList attribute="categories" />
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
          on GitHub
        </div>
      </footer>
    </InstantSearch>
  );
}

App.propTypes = {
  searchState: PropTypes.object,
  resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSearchStateChange: PropTypes.func,
  createURL: PropTypes.func,
  indexName: PropTypes.string,
  searchClient: PropTypes.object,
};

export default App;
