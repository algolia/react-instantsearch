import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SearchParameters } from 'algoliasearch-helper';
import Index, { IndexComponentWithoutContext } from '../Index';
import { IndexConsumer, InstantSearchProvider } from '../../core/context';
import createConnector from '../../core/createConnector';

Enzyme.configure({ adapter: new Adapter() });

describe('Index', () => {
  const createContext = () => ({
    onSearchParameters: jest.fn(),
    widgetsManager: {
      registerWidget: jest.fn(),
      update: jest.fn(),
    },
  });

  const requiredProps = {
    indexName: 'indexName',
    indexId: 'indexId',
    root: {
      Root: 'div',
    },
  };

  it('registers itself on mount', () => {
    const context = createContext();

    const wrapper = shallow(
      <IndexComponentWithoutContext {...requiredProps} contextValue={context}>
        <div />
      </IndexComponentWithoutContext>
    );

    expect(context.widgetsManager.registerWidget).toHaveBeenCalledTimes(1);
    expect(context.widgetsManager.registerWidget).toHaveBeenCalledWith(
      wrapper.instance()
    );
  });

  it('calls onSearchParameters on mount', () => {
    const context = createContext();

    shallow(
      <IndexComponentWithoutContext {...requiredProps} contextValue={context}>
        <div />
      </IndexComponentWithoutContext>
    );

    expect(context.onSearchParameters).toHaveBeenCalledTimes(1);
  });

  it('calls update if indexName prop changes', () => {
    const context = createContext();

    const wrapper = shallow(
      <IndexComponentWithoutContext {...requiredProps} contextValue={context}>
        <div />
      </IndexComponentWithoutContext>
    );

    expect(context.widgetsManager.update).toHaveBeenCalledTimes(0);

    wrapper.setProps({ indexName: 'newIndexName' });

    expect(context.widgetsManager.update).toHaveBeenCalledTimes(1);
  });

  it('unregisters itself on unmount', () => {
    const unregister = jest.fn();
    const context = createContext();

    context.widgetsManager.registerWidget.mockImplementation(() => unregister);

    const wrapper = shallow(
      <IndexComponentWithoutContext {...requiredProps} contextValue={context}>
        <div />
      </IndexComponentWithoutContext>
    );

    expect(unregister).toHaveBeenCalledTimes(0);

    wrapper.unmount();

    expect(unregister).toHaveBeenCalledTimes(1);
  });

  it('exposes multi index context', () => {
    const context = createContext();

    const wrapper = mount(
      <IndexComponentWithoutContext {...requiredProps} contextValue={context}>
        <IndexConsumer>
          {childContext => (
            <div className="inner">{childContext.targetedIndex}</div>
          )}
        </IndexConsumer>
      </IndexComponentWithoutContext>
    );

    expect(wrapper.find('.inner').text()).toBe('indexId');
  });

  it('provides search parameters from instance props', () => {
    const context = createContext();

    const wrapper = shallow(
      <IndexComponentWithoutContext {...requiredProps} contextValue={context}>
        <div />
      </IndexComponentWithoutContext>
    );

    const parameters = wrapper
      .instance()
      .getSearchParameters(new SearchParameters());

    expect(parameters.index).toBe('indexName');
  });

  it('provides search parameters from argument props when instance props are not available', () => {
    const context = createContext();

    const wrapper = shallow(
      <IndexComponentWithoutContext {...requiredProps} contextValue={context}>
        <div />
      </IndexComponentWithoutContext>
    );

    const parameters = wrapper
      .instance()
      .getSearchParameters.call({}, new SearchParameters(), {
        indexName: 'otherIndexName',
      });

    expect(parameters.index).toBe('otherIndexName');
  });

  it('wrapped with InstantSearchProvider: sets correct props', () => {
    const state = {
      results: {},
      resultsFacetValues: {},
      searching: false,
      searchingForFacetValues: false,
      isSearchStalled: false,
      metadata: {},
      error: {},
      widgets: {
        query: 'hello',
      },
    };

    const context = {
      onInternalStateUpdate() {},
      createHrefForState() {},
      onSearchForFacetValues() {},
      onSearchStateChange() {},
      onSearchParameters() {},
      widgetsManager: {
        registerWidget() {},
        getWidgets() {},
        update() {},
      },
      store: {
        setState() {},
        subscribe() {},
        getState: () => state,
      },
    };

    const Dummy = props => {
      return (
        <pre>
          {JSON.stringify(
            props,
            (key, val) => {
              if (key === 'contextValue') {
                expect(val).toEqual(context);
                return 'context';
              }
              return val;
            },
            2
          ).replace(/"/g, '')}
        </pre>
      );
    };

    const Connected = createConnector({
      displayName: 'Connector',
      getProvidedProps: props => ({ providedProps: props }),
    })(Dummy);

    const props = {
      message: 'hello',
    };

    const wrapper = mount(
      <InstantSearchProvider value={context}>
        <Index root={{ Root: 'div' }} indexId="test" indexName="test">
          <Connected {...props} />
        </Index>
      </InstantSearchProvider>
    );

    expect(wrapper.html()).toMatchInlineSnapshot(`
"<div><pre>{
  message: hello,
  providedProps: {
    contextValue: context,
    indexContextValue: {
      targetedIndex: test
    },
    message: hello
  }
}</pre></div>"
`);
  });
});
