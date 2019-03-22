import connect from '../connectInsights';

jest.mock('../../core/createConnector', () => x => x);

describe('connectInsights', () => {
  let insightsClient;
  let props;

  beforeEach(() => {
    insightsClient = jest.fn();

    const createMultiIndexContext = () => ({
      context: {
        ais: {
          mainTargetedIndex: 'theFirstIndex',
        },
        multiIndexContext: {
          targetedIndex: 'theIndex',
        },
      },
    });

    const context = createMultiIndexContext();
    const getProvidedProps = connect(insightsClient).getProvidedProps.bind(
      context
    );

    const hit = {
      objectID: 'objectID_42',
      __position: 42,
      __queryID: 'theQueryID',
    };
    const searchResults = { results: { theIndex: { index: 'theIndex' } } };
    props = getProvidedProps({ hit }, null, searchResults);
  });

  it('should expose an `insights` property', () => {
    expect(props).toHaveProperty('insights');
  });

  it('exposed `insights` should be a function', () => {
    expect(typeof props.insights).toBe('function');
  });

  describe('when called with `clickedObjectIDsAfterSearch`', () => {
    beforeEach(() => {
      props.insights('clickedObjectIDsAfterSearch', {
        eventName: 'Add to cart',
      });
    });

    it('should forward call to insightsClient', () => {
      expect(insightsClient).toHaveBeenCalledTimes(1);
    });

    it('should pass method', () => {
      const [method] = insightsClient.mock.calls[0];
      expect(method).toEqual('clickedObjectIDsAfterSearch');
    });

    it('should pass eventName', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.eventName).toEqual('Add to cart');
    });

    it('should pass objectIDs', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.objectIDs).toEqual(['objectID_42']);
    });

    it('should pass positions', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.positions).toEqual([42]);
    });

    it('should pass queryID', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.queryID).toEqual('theQueryID');
    });

    it('should pass indexName', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.index).toEqual('theIndex');
    });
  });

  describe('when called with `convertedObjectIDsAfterSearch`', () => {
    beforeEach(() => {
      props.insights('convertedObjectIDsAfterSearch', {
        eventName: 'Add to cart',
      });
    });

    it('should forward call to insightsClient', () => {
      expect(insightsClient).toHaveBeenCalledTimes(1);
    });

    it('should pass method', () => {
      const [method] = insightsClient.mock.calls[0];
      expect(method).toEqual('convertedObjectIDsAfterSearch');
    });

    it('should pass eventName', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.eventName).toEqual('Add to cart');
    });

    it('should pass objectIDs', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.objectIDs).toEqual(['objectID_42']);
    });

    it('should not pass positions', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload).not.toHaveProperty('positions');
    });

    it('should pass queryID', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.queryID).toEqual('theQueryID');
    });

    it('should pass indexName', () => {
      const [, payload] = insightsClient.mock.calls[0];
      expect(payload.index).toEqual('theIndex');
    });
  });
});
