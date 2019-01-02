import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createConnector from '../createConnector';

Enzyme.configure({ adapter: new Adapter() });

describe('createConnector', () => {
  const getId = () => 'id';

  const createFakeState = props => ({
    widgets: {},
    results: {},
    resultsFacetValues: {},
    searching: false,
    searchingForFacetValues: false,
    isSearchStalled: false,
    metadata: {},
    error: {},
    ...props,
  });

  const createFakeStore = props => ({
    getState() {},
    setState() {},
    subscribe() {},
    ...props,
  });

  const createFakeWidgetManager = props => ({
    registerWidget() {},
    getWidgets() {},
    update() {},
    ...props,
  });

  const createFakeContext = props => ({
    ais: {
      onInternalStateUpdate() {},
      createHrefForState() {},
      onSearchForFacetValues() {},
      onSearchStateChange() {},
      onSearchParameters() {},
      store: createFakeStore(),
      widgetsManager: createFakeWidgetManager(),
      ...props,
    },
  });

  describe('state', () => {
    it('computes provided props', () => {
      const getProvidedProps = jest.fn(props => ({
        providedProps: props,
      }));

      const Fake = () => null;
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps,
      })(Fake);

      const state = createFakeState();

      const props = {
        hello: 'there',
      };

      const context = createFakeContext({
        store: createFakeStore({
          getState: () => state,
        }),
      });

      const wrapper = shallow(<Connected {...props} />, {
        context,
      });

      expect(getProvidedProps).toHaveBeenCalledTimes(1);
      expect(getProvidedProps).toHaveBeenCalledWith(
        { hello: 'there', canRender: false },
        state.widgets,
        {
          results: state.results,
          searching: state.searching,
          searchingForFacetValues: state.searchingForFacetValues,
          isSearchStalled: state.isSearchStalled,
          error: state.error,
        },
        state.metadata,
        state.resultsFacetValues
      );

      expect(wrapper.find(Fake).props()).toEqual({
        hello: 'there',
        providedProps: {
          hello: 'there',
          canRender: false,
        },
      });
    });

    it('computes provided props on props change', () => {
      const getProvidedProps = jest.fn(props => ({
        providedProps: props,
      }));

      const Fake = () => null;
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps,
      })(Fake);

      const props = {
        hello: 'there',
      };

      const context = createFakeContext({
        store: createFakeStore({
          getState: () => createFakeState(),
        }),
      });

      const wrapper = shallow(<Connected {...props} />, {
        context,
      });

      expect(getProvidedProps).toHaveBeenCalledTimes(1);

      wrapper.setProps({
        hello: 'again',
      });

      expect(getProvidedProps).toHaveBeenCalledTimes(2);
      expect(wrapper.find(Fake).props()).toEqual({
        hello: 'again',
        providedProps: {
          hello: 'again',
          canRender: true,
        },
      });
    });

    it('computes provided props with the correct value for `canRender` on props change', () => {
      const getProvidedProps = jest.fn(props => ({
        providedProps: props,
      }));

      const Fake = () => null;
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps,
      })(Fake);

      const props = {
        hello: 'there',
      };

      const context = createFakeContext({
        store: createFakeStore({
          getState: () => createFakeState(),
        }),
      });

      const wrapper = shallow(<Connected {...props} />, {
        disableLifecycleMethods: true,
        context,
      });

      // Simulate props change before mount
      wrapper.setProps({ hello: 'again' });

      expect(wrapper.find(Fake).props()).toEqual({
        hello: 'again',
        providedProps: {
          hello: 'again',
          canRender: false,
        },
      });

      // Simulate mount lifecycle
      wrapper.instance().componentDidMount();

      // Simulate props change after mount
      wrapper.setProps({ hello: 'once again' });

      expect(wrapper.find(Fake).props()).toEqual({
        hello: 'once again',
        providedProps: {
          hello: 'once again',
          canRender: true,
        },
      });
    });

    it('computes provided props on search state change', () => {
      const getProvidedProps = jest.fn((_, state) => state);

      const Fake = () => null;
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps,
      })(Fake);

      const subscribe = jest.fn();

      const state = createFakeState({
        widgets: {
          query: 'hello',
        },
      });

      const props = {
        hello: 'there',
      };

      const context = createFakeContext({
        store: createFakeStore({
          getState: jest.fn(() => state),
          subscribe,
        }),
      });

      const wrapper = shallow(<Connected {...props} />, {
        context,
      });

      expect(getProvidedProps).toHaveBeenCalledTimes(1);
      expect(wrapper.find(Fake).props()).toEqual({
        hello: 'there',
        query: 'hello',
      });

      // Simulate a search state change
      context.ais.store.getState.mockImplementation(() => ({
        ...state,
        widgets: {
          query: 'hello World',
        },
      }));

      // Simulate a dispatch on search state change
      context.ais.store.subscribe.mock.calls[0][0]();

      expect(getProvidedProps).toHaveBeenCalledTimes(2);
      expect(wrapper.find(Fake).props()).toEqual({
        hello: 'there',
        query: 'hello World',
      });
    });

    it('computes provided props with latest props on search state change', () => {
      const getProvidedProps = jest.fn((_, state) => state);

      const Fake = () => null;
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps,
      })(Fake);

      const subscribe = jest.fn();

      const state = createFakeState({
        widgets: {
          query: 'hello',
        },
      });

      const props = {
        hello: 'there',
      };

      const context = createFakeContext({
        store: createFakeStore({
          getState: jest.fn(() => state),
          subscribe,
        }),
      });

      const wrapper = shallow(<Connected {...props} />, {
        context,
      });

      expect(wrapper.find(Fake).props()).toEqual({
        hello: 'there',
        query: 'hello',
      });

      // Simulate a search state change
      context.ais.store.getState.mockImplementation(() => ({
        ...state,
        widgets: {
          query: 'hello world',
        },
      }));

      // Simulate a props change
      wrapper.setProps({
        hello: 'again',
      });

      // Simulate a dispatch on search state change
      context.ais.store.subscribe.mock.calls[0][0]();

      expect(wrapper.find(Fake).props()).toEqual({
        hello: 'again',
        query: 'hello world',
      });
    });

    it('does not compute provided props when props do not change', () => {
      const getProvidedProps = jest.fn(props => ({
        providedProps: props,
      }));

      const Fake = jest.fn(() => null);
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps,
      })(Fake);

      const props = {
        hello: 'again',
        another: ['one', 'two'],
      };

      const context = createFakeContext({
        store: createFakeStore({
          getState: () => createFakeState(),
        }),
      });

      const wrapper = shallow(<Connected {...props} />, {
        context,
      });

      expect(getProvidedProps).toHaveBeenCalledTimes(1);

      wrapper.setProps({
        hello: 'again',
        another: ['one', 'two'],
      });

      expect(getProvidedProps).toHaveBeenCalledTimes(1);

      wrapper.setProps({
        hello: 'again',
        another: ['one', 'two'],
      });

      expect(getProvidedProps).toHaveBeenCalledTimes(1);
    });

    it('subscribes to the store once mounted', () => {
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps: () => {},
      })(() => null);

      const subscribe = jest.fn();

      const context = createFakeContext({
        store: createFakeStore({
          getState: () => createFakeState(),
          subscribe,
        }),
      });

      const wrapper = shallow(<Connected />, {
        disableLifecycleMethods: true,
        context,
      });

      expect(subscribe).toHaveBeenCalledTimes(0);

      // Simulate didMount
      wrapper.instance().componentDidMount();

      expect(subscribe).toHaveBeenCalledTimes(1);
    });

    it('unsubscribes from the store on unmount', () => {
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps: () => {},
      })(() => null);

      const unsubscribe = jest.fn();

      const context = createFakeContext({
        store: createFakeStore({
          getState: () => createFakeState(),
          subscribe: () => unsubscribe,
        }),
      });

      const wrapper = shallow(<Connected />, {
        context,
      });

      expect(unsubscribe).toHaveBeenCalledTimes(0);

      wrapper.unmount();

      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });

    it('does not throw an error on unmount before mount', () => {
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps: () => null,
      })(() => null);

      const context = createFakeContext({
        store: createFakeStore({
          getState: () => createFakeState(),
          subscribe() {
            return () => {
              // unsubscribe
            };
          },
        }),
      });

      const wrapper = shallow(<Connected />, {
        disableLifecycleMethods: true,
        context,
      });

      expect(() => wrapper.unmount()).not.toThrow();
    });

    it('does not throw an error on dispatch after unmount', () => {
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps: () => null,
      })(() => null);

      const unsubscribe = () => {};
      const subscribe = jest.fn(() => unsubscribe);

      const context = createFakeContext({
        store: createFakeStore({
          getState: () => createFakeState(),
          subscribe,
        }),
      });

      const wrapper = shallow(<Connected />, {
        context,
      });

      expect(() => () => {
        wrapper.unmount();

        // Simulate a dispatch
        subscribe.mock.calls[0][0]();
      }).not.toThrow();
    });
  });

  describe('widget', () => {
    it("doesn't register itself as a widget when neither getMetadata nor getSearchParameters are present", () => {
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getId,
      })(() => null);
      const registerWidget = jest.fn();
      mount(<Connected />, {
        context: {
          ais: {
            store: {
              getState: () => ({}),
              subscribe: () => null,
            },
            widgetsManager: {
              registerWidget,
            },
          },
        },
      });
      expect(registerWidget.mock.calls).toHaveLength(0);
    });

    it('registers itself as a widget with getMetadata', () => {
      const metadata = {};
      const getMetadata = jest.fn(() => metadata);
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getMetadata,
        getId,
      })(() => null);
      const registerWidget = jest.fn();
      const props = { hello: 'there' };
      mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => ({}),
              subscribe: () => null,
            },
            widgetsManager: {
              registerWidget,
            },
          },
        },
      });
      expect(registerWidget.mock.calls).toHaveLength(1);
      const state = {};
      const outputMetadata = registerWidget.mock.calls[0][0].getMetadata(state);
      expect(getMetadata.mock.calls).toHaveLength(1);
      expect(getMetadata.mock.calls[0][0]).toEqual(props);
      expect(getMetadata.mock.calls[0][1]).toBe(state);
      expect(outputMetadata).toBe(metadata);
    });

    it('registers itself as a widget with getSearchParameters', () => {
      const sp = {};
      const getSearchParameters = jest.fn(() => sp);
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getSearchParameters,
        getId,
      })(() => null);
      const registerWidget = jest.fn();
      const props = { hello: 'there' };
      const state = {
        widgets: {},
      };
      mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => state,
              subscribe: () => null,
            },
            widgetsManager: {
              registerWidget,
            },
            onSearchParameters: () => {},
          },
        },
      });
      expect(registerWidget.mock.calls).toHaveLength(1);
      const inputSP = {};
      const outputSP = registerWidget.mock.calls[0][0].getSearchParameters(
        inputSP
      );
      expect(getSearchParameters.mock.calls).toHaveLength(1);
      expect(getSearchParameters.mock.calls[0][0]).toBe(inputSP);
      expect(getSearchParameters.mock.calls[0][1]).toEqual(props);
      expect(getSearchParameters.mock.calls[0][2]).toBe(state.widgets);
      expect(outputSP).toBe(sp);
    });

    it('registers itself as a widget once mounted', () => {
      const Connected = createConnector({
        displayName: 'Connector',
        getProvidedProps: () => null,
        getSearchParameters: () => null,
        getId,
      })(() => null);

      const registerWidget = jest.fn();

      const state = {
        widgets: {},
      };

      const context = {
        ais: {
          store: {
            getState: () => state,
            subscribe: () => null,
          },
          widgetsManager: {
            registerWidget,
          },
          onSearchParameters: () => {},
        },
      };

      const wrapper = shallow(<Connected />, {
        disableLifecycleMethods: true,
        context,
      });

      expect(registerWidget).toHaveBeenCalledTimes(0);

      // Simulate didMount
      wrapper.instance().componentDidMount();

      expect(registerWidget).toHaveBeenCalledTimes(1);
      expect(registerWidget).toHaveBeenCalledWith(wrapper.instance());
    });

    it('calls onSearchParameters on mount', () => {
      const getSearchParameters = jest.fn(() => null);
      const onSearchParameters = jest.fn(() => null);
      let Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getSearchParameters,
        getId,
      })(() => null);
      const state = {
        widgets: {},
      };
      const registerWidget = jest.fn();
      const props = { hello: 'there' };
      const context = {
        ais: {
          store: {
            getState: () => state,
            subscribe: () => null,
          },
          onSearchParameters,
          widgetsManager: {
            registerWidget,
          },
        },
      };
      mount(<Connected {...props} />, {
        context,
      });

      expect(onSearchParameters.mock.calls).toHaveLength(1);
      expect(onSearchParameters.mock.calls[0][0]).toEqual(expect.any(Function));
      expect(onSearchParameters.mock.calls[0][1]).toEqual(context);
      expect(onSearchParameters.mock.calls[0][2]).toEqual(props);

      Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getId,
      })(() => null);

      mount(<Connected {...props} />, {
        context,
      });

      expect(onSearchParameters.mock.calls).toHaveLength(1);
    });

    it('binds getSearchParameters to its own instance when calling onSearchParameters on mount', () => {
      const getSearchParameters = jest.fn(() => null);
      const onSearchParameters = jest.fn(boundGetSearchParameters =>
        // The bound getSearchParameters function must be invoked in order for it
        // to be registered as an instance of getSearchParameters
        boundGetSearchParameters()
      );

      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getSearchParameters,
        getId,
      })(() => null);
      const state = {
        widgets: {},
      };
      const registerWidget = jest.fn();
      const props = { hello: 'there' };
      const context = {
        ais: {
          store: {
            getState: () => state,
            subscribe: () => null,
          },
          onSearchParameters,
          widgetsManager: {
            registerWidget,
          },
        },
      };
      mount(<Connected {...props} />, {
        context,
      });

      expect(getSearchParameters.mock.instances).toHaveLength(1);
      expect(getSearchParameters.mock.instances[0].props).toEqual(props);
      expect(getSearchParameters.mock.instances[0].context).toEqual(context);
    });

    it('calls update when props change', () => {
      const transitionState = jest.fn();
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getMetadata: () => null,
        getId,
        transitionState,
      })(() => null);
      const update = jest.fn();
      const onSearchStateChange = jest.fn();
      const props = { hello: 'there' };
      const wrapper = mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => ({}),
              subscribe: () => null,
            },
            widgetsManager: {
              registerWidget: () => null,
              update,
            },
            onSearchStateChange,
          },
        },
      });
      expect(update.mock.calls).toHaveLength(0);
      expect(onSearchStateChange.mock.calls).toHaveLength(0);
      expect(transitionState.mock.calls).toHaveLength(0);
      wrapper.setProps({ hello: 'you' });
      expect(update.mock.calls).toHaveLength(1);
      expect(onSearchStateChange.mock.calls).toHaveLength(1);
      expect(transitionState.mock.calls).toHaveLength(1);
    });

    it('dont trigger onSearchStateChange when props change and the component has no transitionState function', () => {
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getMetadata: () => null,
        getId,
      })(() => null);
      const update = jest.fn();
      const onSearchStateChange = jest.fn();
      const props = { hello: 'there' };
      const wrapper = mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => ({}),
              subscribe: () => null,
            },
            widgetsManager: {
              registerWidget: () => null,
              update,
            },
            onSearchStateChange,
          },
        },
      });
      expect(update.mock.calls).toHaveLength(0);
      expect(onSearchStateChange.mock.calls).toHaveLength(0);
      wrapper.setProps({ hello: 'you' });
      expect(update.mock.calls).toHaveLength(1);
      expect(onSearchStateChange.mock.calls).toHaveLength(0);
    });

    it('dont update when props dont change', () => {
      const transitionState = jest.fn();
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getMetadata: () => null,
        getId,
        transitionState,
      })(() => null);
      const onSearchStateChange = jest.fn();
      const update = jest.fn();
      const props = { hello: 'there' };
      const wrapper = mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => ({}),
              subscribe: () => null,
            },
            widgetsManager: {
              registerWidget: () => null,
              update,
            },
            onSearchStateChange,
          },
        },
      });
      expect(onSearchStateChange.mock.calls).toHaveLength(0);
      expect(update.mock.calls).toHaveLength(0);
      expect(transitionState.mock.calls).toHaveLength(0);
      wrapper.setProps({ hello: 'there' });
      expect(onSearchStateChange.mock.calls).toHaveLength(0);
      expect(update.mock.calls).toHaveLength(0);
      expect(transitionState.mock.calls).toHaveLength(0);
    });

    it('use shouldComponentUpdate when provided', () => {
      const shouldComponentUpdate = jest.fn(() => true);
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: props => props,
        getMetadata: () => null,
        getId,
        shouldComponentUpdate,
      })(() => null);

      const onSearchStateChange = jest.fn();
      const update = jest.fn();
      const props = { hello: 'there' };
      const wrapper = mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => ({}),
              subscribe: () => null,
            },
            widgetsManager: {
              registerWidget: () => null,
              update,
            },
            onSearchStateChange,
          },
        },
      });

      expect(shouldComponentUpdate).toHaveBeenCalledTimes(0);

      wrapper.setProps({ hello: 'here' });

      expect(shouldComponentUpdate).toHaveBeenCalledTimes(1);
      expect(shouldComponentUpdate).toHaveBeenCalledWith(
        { hello: 'there' },
        { hello: 'here' },
        {
          props: {
            hello: 'there',
            canRender: false,
          },
        },
        {
          props: {
            hello: 'here',
            canRender: true,
          },
        }
      );
    });

    describe('unmounting', () => {
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => null,
        getMetadata: () => null,
        cleanUp: () => ({ another: { state: 'state', key: {} }, key: {} }),
      })(() => null);
      const unregister = jest.fn();
      const setState = jest.fn();
      const onSearchStateChange = jest.fn();

      it('unregisters itself on unmount', () => {
        const wrapper = mount(<Connected />, {
          context: {
            ais: {
              store: {
                getState: () => ({ widgets: { another: { state: 'state' } } }),
                setState,
                subscribe: () => () => null,
              },
              widgetsManager: {
                registerWidget: () => unregister,
              },
              onSearchStateChange,
            },
          },
        });
        expect(unregister.mock.calls).toHaveLength(0);
        expect(setState.mock.calls).toHaveLength(0);
        expect(onSearchStateChange.mock.calls).toHaveLength(0);

        wrapper.unmount();

        expect(unregister.mock.calls).toHaveLength(1);
        expect(setState.mock.calls).toHaveLength(1);
        expect(onSearchStateChange.mock.calls).toHaveLength(1);
        expect(setState.mock.calls[0][0]).toEqual({
          widgets: { another: { state: 'state' } },
        });
        expect(onSearchStateChange.mock.calls[0][0]).toEqual({
          another: { state: 'state' },
        });
      });

      it('does not throw an error on unmount before mount', () => {
        const wrapper = shallow(<Connected />, {
          disableLifecycleMethods: true,
          context: {
            ais: {
              store: {
                getState: () => ({}),
                subscribe: () => {},
              },
              widgetsManager: {
                registerWidget: () => {},
              },
            },
          },
        });

        const trigger = () => wrapper.unmount();

        expect(() => trigger()).not.toThrow();
      });

      it('empty key from the search state should be removed', () => {
        const wrapper = mount(<Connected />, {
          context: {
            ais: {
              store: {
                getState: () => ({ widgets: { another: { state: 'state' } } }),
                setState,
                subscribe: () => () => null,
              },
              widgetsManager: {
                registerWidget: () => unregister,
              },
              onSearchStateChange,
            },
          },
        });
        wrapper.unmount();

        expect(onSearchStateChange.mock.calls[0][0]).toEqual({
          another: { state: 'state' },
        });
      });
    });
  });

  describe('refine', () => {
    it('passes a refine method to the component', () => {
      const Dummy = () => null;
      const nextState = {};
      const widgets = {};
      const refine = jest.fn(() => nextState);
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => ({}),
        refine,
        getId,
      })(Dummy);
      const onInternalStateUpdate = jest.fn();
      const props = { hello: 'there' };
      const wrapper = mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => ({
                widgets,
              }),
              subscribe: () => null,
            },
            onInternalStateUpdate,
          },
        },
      });
      const passedProps = wrapper.find(Dummy).props();
      const arg1 = {};
      const arg2 = {};
      passedProps.refine(arg1, arg2);
      expect(refine.mock.calls[0][0]).toEqual(props);
      expect(refine.mock.calls[0][1]).toBe(widgets);
      expect(refine.mock.calls[0][2]).toBe(arg1);
      expect(refine.mock.calls[0][3]).toBe(arg2);
      expect(onInternalStateUpdate.mock.calls[0][0]).toBe(nextState);
    });

    it('passes a createURL method to the component', () => {
      const Dummy = () => null;
      const nextState = {};
      const widgets = {};
      const refine = jest.fn(() => nextState);
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => ({}),
        refine,
        getId,
      })(Dummy);
      const createHrefForState = jest.fn();
      const props = { hello: 'there' };
      const wrapper = mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => ({
                widgets,
              }),
              subscribe: () => null,
            },
            createHrefForState,
          },
        },
      });
      const passedProps = wrapper.find(Dummy).props();
      const arg1 = {};
      const arg2 = {};
      passedProps.createURL(arg1, arg2);
      expect(refine.mock.calls[0][0]).toEqual(props);
      expect(refine.mock.calls[0][1]).toBe(widgets);
      expect(refine.mock.calls[0][2]).toBe(arg1);
      expect(refine.mock.calls[0][3]).toBe(arg2);
      expect(createHrefForState.mock.calls[0][0]).toBe(nextState);
    });
  });

  describe('searchForFacetValues', () => {
    it('passes a searchForItems method to the component', () => {
      const Dummy = () => null;
      const searchState = {};
      const widgets = {};
      const searchForFacetValues = jest.fn(() => searchState);
      const Connected = createConnector({
        displayName: 'CoolConnector',
        getProvidedProps: () => ({}),
        searchForFacetValues,
        getId,
      })(Dummy);
      const onSearchForFacetValues = jest.fn();
      const props = { hello: 'there' };
      const wrapper = mount(<Connected {...props} />, {
        context: {
          ais: {
            store: {
              getState: () => ({
                widgets,
              }),
              subscribe: () => null,
            },
            onSearchForFacetValues,
          },
        },
      });
      const passedProps = wrapper.find(Dummy).props();
      const facetName = 'facetName';
      const query = 'query';

      passedProps.searchForItems(facetName, query);
      expect(searchForFacetValues.mock.calls[0][0]).toEqual(props);
      expect(searchForFacetValues.mock.calls[0][1]).toBe(widgets);
      expect(searchForFacetValues.mock.calls[0][2]).toBe(facetName);
      expect(searchForFacetValues.mock.calls[0][3]).toBe(query);
      expect(onSearchForFacetValues.mock.calls[0][0]).toBe(searchState);
    });
  });
});
