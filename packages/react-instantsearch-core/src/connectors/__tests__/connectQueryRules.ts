import connect from '../connectQueryRules';

jest.mock('../../core/createConnector', () => (component: React.Component) =>
  component
);

describe('connectQueryRules', () => {
  describe('single index', () => {
    const indexName = 'index';
    const context = { context: { ais: { mainTargetedIndex: indexName } } };
    const getProvidedProps = connect.getProvidedProps.bind(context);

    describe('without userData', () => {
      it('provides the correct props to the component', () => {
        const props = {};
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
        const props = {};
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
        const props = {
          transformItems: () => [{ banner: 'image-transformed.png' }],
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
      });
    });
  });

  describe('multi index', () => {
    const indexName = 'index';
    const context = {
      context: {
        ais: { mainTargetedIndex: indexName },
        multiIndexContext: { targetedIndex: indexName },
      },
    };
    const getProvidedProps = connect.getProvidedProps.bind(context);

    describe('without userData', () => {
      it('provides the correct props to the component', () => {
        const props = {};
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
        const props = {};
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
        const props = {
          transformItems: () => [{ banner: 'image-transformed.png' }],
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
      });
    });
  });
});
