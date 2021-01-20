import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MutationObserver from '@sheerun/mutationobserver-shim';
import Answers from '../Answers';

describe('Answers', () => {
  let searchClient;
  beforeEach(() => {
    searchClient = algoliasearch(
      'CKOEQ4XGMU',
      '6560d3886292a5aec86d63b9a2cba447'
    );
  });

  it('renders empty Answers widget', () => {
    const { container } = render(
      <InstantSearch indexName="ted" searchClient={searchClient}>
        <Answers searchClient={searchClient} queryLanguages={['en']} />
      </InstantSearch>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ais-Answers ais-Answers--empty"
        >
          <div
            class="ais-Answers-header"
          />
          <ul
            class="ais-Answers-list"
          />
        </div>
      </div>
    `);
  });

  it('renders loader when a query is given', () => {
    const { getByText, getByPlaceholderText } = render(
      <InstantSearch indexName="ted" searchClient={searchClient}>
        <SearchBox />
        <Answers
          searchClient={searchClient}
          queryLanguages={['en']}
          answersComponent={({ isLoading }) =>
            isLoading ? <p>is loading</p> : <p>not loading</p>
          }
        />
      </InstantSearch>
    );
    getByText('not loading');
    fireEvent.change(getByPlaceholderText('Search here…'), {
      target: { value: 's' },
    });
    getByText('is loading');
  });

  it('does not render list when loading', () => {
    const { container, getByPlaceholderText } = render(
      <InstantSearch indexName="ted" searchClient={searchClient}>
        <SearchBox />
        <Answers searchClient={searchClient} queryLanguages={['en']} />
      </InstantSearch>
    );
    fireEvent.change(getByPlaceholderText('Search here…'), {
      target: { value: 's' },
    });
    expect(container.querySelector('ul.ais-Answers-list')).toBeNull();
  });

  it('renders an answer', async () => {
    // It's required for `waitFor` method.
    // https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
    window.MutationObserver = MutationObserver;

    const { getByText, getByPlaceholderText } = render(
      <InstantSearch indexName="ted" searchClient={searchClient}>
        <SearchBox />
        <Answers
          searchClient={searchClient}
          queryLanguages={['en']}
          answersComponent={({ isLoading, hits }) =>
            !isLoading && hits && hits.length > 0 ? (
              <div>
                <p>hits received</p>
                <pre>{JSON.stringify(hits)}</pre>
              </div>
            ) : (
              <pre>{JSON.stringify({ isLoading, hits })}</pre>
            )
          }
        />
      </InstantSearch>
    );
    fireEvent.change(getByPlaceholderText('Search here…'), {
      target: { value: 'sarah' },
    });
    await waitFor(() => getByText('hits received'), { timeout: 5000 });
  });
});
