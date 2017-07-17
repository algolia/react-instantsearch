/* eslint-env jest, jasmine */

import connect from './connectBreadcrumb.js';
import { SearchParameters } from 'algoliasearch-helper';

jest.mock('../core/createConnector');

describe('connectAutoComplete', () => {
  describe('single index', () => {
    const context = { context: { ais: { mainTargetedIndex: 'index' } } };
    const getProvidedProps = connect.getProvidedProps.bind(context);
    it('provides the correct props to the component', () => {
      const results = {
        getFacetValues: jest.fn(),
        getFacetByName: () => true,
        hits: [],
      };

      results.getFacetValues.mockClear();
      results.getFacetValues.mockImplementation(() => ({
        data: [
          {
            name: 'wat',
            path: 'wat',
            count: 20,
            isRefined: true,
            data: [
              {
                name: 'wot',
                path: 'wat > wot',
                count: 15,
                isRefined: true,
              },
              {
                name: 'wut',
                path: 'wat > wut',
                count: 5,
                isRefined: false,
              },
            ],
          },
          {
            name: 'oy',
            path: 'oy',
            count: 10,
            isRefined: false,
          },
        ],
      }));
      let props = getProvidedProps(
        { attributes: ['ok'] },
        { hierarchicalMenu: { ok: 'wat' } },
        { results }
      );
      expect(props.items).toEqual([
        {
          label: 'wat',
          value: 'wat',
        },
        {
          label: 'wot',
          value: 'wat > wot',
        },
      ]);
    });
  });
});
