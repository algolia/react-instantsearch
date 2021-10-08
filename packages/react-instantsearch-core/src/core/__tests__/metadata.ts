import algoliasearch from 'algoliasearch/lite';
import { SearchClient } from '../../widgets/InstantSearch';
import createWidgetsManager from '../createWidgetsManager';
import { isMetadataEnabled, getMetadataPayload } from '../metadata';

declare global {
  // using namespace so it's only in this file
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      navigator: {
        userAgent: string;
      };
      window: Window;
    }
  }
}

const { window } = global;
Object.defineProperty(
  window.navigator,
  'userAgent',
  (value => ({
    get() {
      return value;
    },
    set(v: string) {
      value = v;
    },
  }))(window.navigator.userAgent)
);

const defaultUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15';
const algoliaUserAgent = 'Algolia Crawler 5.3.2';

describe('isMetadataEnabled', () => {
  it('does not enable on normal user agent', () => {
    global.navigator.userAgent = defaultUserAgent;

    expect(isMetadataEnabled()).toBe(false);
  });

  it("does not enable when there's no window", () => {
    global.navigator.userAgent = algoliaUserAgent;

    // @ts-expect-error
    delete global.window;

    expect(isMetadataEnabled()).toBe(false);

    global.window = window;
  });

  it('metadata enabled returns true', () => {
    global.navigator.userAgent = algoliaUserAgent;

    expect(isMetadataEnabled()).toBe(true);
  });
});

describe('getMetadataPayload', () => {
  describe('user agent', () => {
    test('extracts user agent from algoliasearch', () => {
      const widgetsManager = createWidgetsManager(() => {});
      const searchClient = (algoliasearch(
        'appId',
        'apiKey'
      ) as unknown) as SearchClient;

      const { ua } = getMetadataPayload(widgetsManager, searchClient);

      expect(ua).toEqual(
        expect.stringMatching(
          /^Algolia for JavaScript \((\d+\.?)+\); Node\.js \((\d+\.?)+\)$/
        )
      );
    });

    test('extracts user agent from algoliasearch v3', () => {
      const widgetsManager = createWidgetsManager(() => {});
      const searchClient = {
        search() {
          return Promise.resolve({});
        },
        searchForFacetValues() {
          return Promise.resolve({});
        },
        _ua: 'v3 style user agent',
      };

      const { ua } = getMetadataPayload(widgetsManager, searchClient);

      expect(ua).toEqual('v3 style user agent');
    });

    test('extracts nothing if absent', () => {
      const widgetsManager = createWidgetsManager(() => {});
      const searchClient = {
        search() {
          return Promise.resolve({});
        },
        searchForFacetValues() {
          return Promise.resolve({});
        },
      };

      const { ua } = getMetadataPayload(widgetsManager, searchClient);

      expect(ua).toBe(undefined);
    });
  });

  describe('widgets', () => {
    test('detects empty widgets', () => {
      const widgetsManager = createWidgetsManager(() => {});
      const searchClient = (algoliasearch(
        'appId',
        'apiKey'
      ) as unknown) as SearchClient;

      const { widgets } = getMetadataPayload(widgetsManager, searchClient);

      expect(widgets).toEqual([]);
    });
  });
});
