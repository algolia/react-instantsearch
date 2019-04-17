import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InstantSearch from '../../components/InstantSearch';
import createInstantSearch from '../createInstantSearch';
import version from '../version';

Enzyme.configure({ adapter: new Adapter() });

describe('createInstantSearch', () => {
  const searchClient = { addAlgoliaAgent: jest.fn() };
  const searchClientFactory = jest.fn(() => searchClient);
  const CustomInstantSearch = createInstantSearch(searchClientFactory, {
    Root: 'div',
  });

  beforeEach(() => {
    searchClient.addAlgoliaAgent.mockClear();
    searchClientFactory.mockClear();
  });

  it('wraps InstantSearch', () => {
    const wrapper = shallow(
      <CustomInstantSearch searchClient={searchClient} indexName="name" />
    );

    const { searchClient: _, ...propsWithoutClient } = wrapper.props();

    expect(wrapper.is(InstantSearch)).toBe(true);
    expect(wrapper.props().searchClient).toBe(searchClient);
    expect(propsWithoutClient).toMatchInlineSnapshot(`
            Object {
              "children": undefined,
              "createURL": undefined,
              "indexName": "name",
              "onSearchParameters": undefined,
              "onSearchStateChange": undefined,
              "refresh": false,
              "resultsState": undefined,
              "root": Object {
                "Root": "div",
              },
              "searchState": undefined,
              "stalledSearchDelay": 200,
            }
        `);
  });

  it('uses the provided searchClient', () => {
    const wrapper = shallow(
      <CustomInstantSearch searchClient={searchClient} indexName="name" />
    );

    expect(searchClientFactory).toHaveBeenCalledTimes(0);
    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledTimes(2);
    expect(wrapper.props().searchClient).toBe(searchClient);
  });

  it('does not throw if searchClient does not have a `addAlgoliaAgent()` method', () => {
    const client = {};
    const trigger = () =>
      shallow(<CustomInstantSearch indexName="name" searchClient={client} />);

    expect(() => trigger()).not.toThrow();
  });

  it('updates the searchClient when provided searchClient is passed down', () => {
    const newSearchClient = {
      addAlgoliaAgent: jest.fn(),
    };

    const wrapper = shallow(
      <CustomInstantSearch searchClient={searchClient} indexName="name" />
    );

    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledTimes(2);

    wrapper.setProps({
      searchClient: newSearchClient,
    });

    expect(wrapper.props().searchClient).toBe(newSearchClient);
    expect(newSearchClient.addAlgoliaAgent).toHaveBeenCalledTimes(2);
  });

  it('does not throw when searchClient gets updated and does not have a `addAlgoliaAgent()` method', () => {
    const client = {};
    const makeWrapper = () =>
      shallow(<CustomInstantSearch indexName="name" searchClient={client} />);

    expect(() => {
      makeWrapper().setProps({
        searchClient: client,
      });
    }).not.toThrow();
  });

  it('expect to create InstantSearch with a custom root props', () => {
    const root = {
      Root: 'span',
      props: {
        style: {
          flex: 1,
        },
      },
    };

    const wrapper = shallow(
      <CustomInstantSearch indexName="name" searchClient={{}} root={root} />
    );

    // eslint-disable-next-line no-shadow, no-unused-vars
    const { searchClient, ...propsWithoutClient } = wrapper.props();

    expect(wrapper.props().root).toEqual(root);
    expect(propsWithoutClient).toMatchInlineSnapshot(`
                  Object {
                    "children": undefined,
                    "createURL": undefined,
                    "indexName": "name",
                    "onSearchParameters": undefined,
                    "onSearchStateChange": undefined,
                    "refresh": false,
                    "resultsState": undefined,
                    "root": Object {
                      "Root": "span",
                      "props": Object {
                        "style": Object {
                          "flex": 1,
                        },
                      },
                    },
                    "searchState": undefined,
                    "stalledSearchDelay": 200,
                  }
            `);
  });
});
