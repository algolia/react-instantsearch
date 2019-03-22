import connect, { QueryRulesProps } from '../connectQueryRules';

jest.mock('../../core/createConnector', () => (connector: any) => connector);

describe('connectQueryRules', () => {
  describe('single index', () => {
    const indexName = 'index';
    const context = { context: { ais: { mainTargetedIndex: indexName } } };
    const getProvidedProps = connect.getProvidedProps.bind(context);

    describe('without userData', () => {
      it('provides the correct props to the component', () => {
        const props: QueryRulesProps = {
          transformItems: items => items,
        };
        const searchState = {};
        const searchResults = {
          results: { [indexName]: { userData: undefined } },
        };

        expect(getProvidedProps(props, searchState, searchResults)).toEqual({
          items: [],
          canRefine: false,
        });
      });
    });

    describe('with userData', () => {
      it('provides the correct props to the component', () => {
        const props: QueryRulesProps = {
          transformItems: items => items,
        };
        const searchState = {};
        const searchResults = {
          results: {
            [indexName]: { userData: [{ banner: 'image.png' }] },
          },
        };

        expect(getProvidedProps(props, searchState, searchResults)).toEqual({
          items: [{ banner: 'image.png' }],
          canRefine: true,
        });
      });

      it('transforms items before passing the props to the component', () => {
        const transformItemsSpy = jest.fn(() => [
          { banner: 'image-transformed.png' },
        ]);
        const props: QueryRulesProps = {
          transformItems: transformItemsSpy,
        };
        const searchState = {};
        const searchResults = {
          results: {
            [indexName]: { userData: [{ banner: 'image.png' }] },
          },
        };

        expect(getProvidedProps(props, searchState, searchResults)).toEqual({
          items: [{ banner: 'image-transformed.png' }],
          canRefine: true,
        });
        expect(transformItemsSpy).toHaveBeenCalledTimes(1);
        expect(transformItemsSpy).toHaveBeenCalledWith([
          { banner: 'image.png' },
        ]);
      });
    });
  });

  describe('multi index', () => {
    const firstIndexName = 'firstIndex';
    const secondIndexName = 'secondIndex';
    const context = {
      context: {
        ais: { mainTargetedIndex: firstIndexName },
        multiIndexContext: { targetedIndex: secondIndexName },
      },
    };
    const getProvidedProps = connect.getProvidedProps.bind(context);

    describe('without userData', () => {
      it('provides the correct props to the component', () => {
        const props: QueryRulesProps = {
          transformItems: items => items,
        };
        const searchState = {};
        const searchResults = {
          results: { [secondIndexName]: { userData: undefined } },
        };

        expect(getProvidedProps(props, searchState, searchResults)).toEqual({
          items: [],
          canRefine: false,
        });
      });
    });

    describe('with userData', () => {
      it('provides the correct props to the component', () => {
        const props: QueryRulesProps = {
          transformItems: items => items,
        };
        const searchState = {};
        const searchResults = {
          results: {
            [secondIndexName]: { userData: [{ banner: 'image.png' }] },
          },
        };

        expect(getProvidedProps(props, searchState, searchResults)).toEqual({
          items: [{ banner: 'image.png' }],
          canRefine: true,
        });
      });

      it('transforms items before passing the props to the component', () => {
        const transformItemsSpy = jest.fn(() => [
          { banner: 'image-transformed.png' },
        ]);
        const props: QueryRulesProps = {
          transformItems: transformItemsSpy,
        };
        const searchState = {};
        const searchResults = {
          results: {
            [secondIndexName]: { userData: [{ banner: 'image.png' }] },
          },
        };
        expect(getProvidedProps(props, searchState, searchResults)).toEqual({
          items: [{ banner: 'image-transformed.png' }],
          canRefine: true,
        });
        expect(transformItemsSpy).toHaveBeenCalledTimes(1);
        expect(transformItemsSpy).toHaveBeenCalledWith([
          { banner: 'image.png' },
        ]);
      });
    });
  });
});
