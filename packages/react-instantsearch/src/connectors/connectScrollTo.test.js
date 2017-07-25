/* eslint-env jest, jasmine */

import connect from './connectScrollTo';
jest.mock('../core/createConnector');

let props;
describe('connectScrollTo', () => {
  describe('single index', () => {
    const context = { context: { ais: { mainTargetedIndex: 'index' } } };
    const getProvidedProps = connect.getProvidedProps.bind(context);
    it('provides the correct props to the component', () => {
      props = getProvidedProps(
        { scrollOn: 'p' },
        { p: 1, configure: 3, refinementList: 'ok' }
      );
      expect(props).toEqual({ value: 1, hasNotChanged: false });

      props = getProvidedProps(
        { scrollOn: 'p' },
        { p: 1, configure: 3, refinementList: 'not ok' }
      );
      expect(props).toEqual({ value: 1, hasNotChanged: false });

      props = getProvidedProps(
        { scrollOn: 'p' },
        { p: 2, configure: 3, refinementList: 'not ok' }
      );
      expect(props).toEqual({ value: 2, hasNotChanged: true });

      props = getProvidedProps({ scrollOn: 'anything' }, { anything: 2 });
      expect(props).toEqual({ value: 2, hasNotChanged: false });
    });
  });
  describe('multi index', () => {
    const context = {
      context: {
        ais: { mainTargetedIndex: 'first' },
        multiIndexContext: { targetedIndex: 'second' },
      },
    };
    const getProvidedProps = connect.getProvidedProps.bind(context);
    it('provides the correct props to the component', () => {
      props = getProvidedProps(
        { scrollOn: 'p' },
        { indices: { second: { p: 1 } } }
      );
      expect(props).toEqual({ value: 1, hasNotChanged: false });

      props = getProvidedProps(
        { scrollOn: 'anything' },
        { indices: { second: { anything: 2 } } }
      );
      expect(props).toEqual({ value: 2, hasNotChanged: true });
    });
  });
});
