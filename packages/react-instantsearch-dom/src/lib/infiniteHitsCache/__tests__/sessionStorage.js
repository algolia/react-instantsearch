import createInfiniteHitsSessionStorageCache from '../sessionStorage';

const KEY = 'ais.infiniteHits';

describe('createInfiniteHitsSessionStorageCache', () => {
  let sessionStorageBackup;
  const store = {};
  beforeAll(() => {
    sessionStorageBackup = window.sessionStorage;
  });
  beforeEach(() => {
    window.sessionStorage = {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value;
      },
    };
  });
  afterAll(() => {
    window.sessionStorage = sessionStorageBackup;
  });

  it('returns null initially', () => {
    const cache = createInfiniteHitsSessionStorageCache();
    expect(cache.read({})).toBeNull();
  });

  it('returns what it was assigned before', () => {
    const cache = createInfiniteHitsSessionStorageCache();
    const state = { q: 'hello' };
    const hits = { 1: ['a', 'b', 'c'] };
    cache.write({ state, hits });
    expect(cache.read({ state })).toEqual(hits);
  });

  it('returns null if the state is different', () => {
    const cache = createInfiniteHitsSessionStorageCache();
    const state = { q: 'hello' };
    const newState = { q: 'world' };
    const hits = { 1: ['a', 'b', 'c'] };
    cache.write({ state, hits });
    expect(cache.read({ state: newState })).toBeNull();
  });

  it('clears cache if fails to read', () => {
    const getItem = jest.fn(() => '{invalid_json}');
    const removeItem = jest.fn();
    window.sessionStorage = {
      getItem,
      removeItem,
    };
    const cache = createInfiniteHitsSessionStorageCache();
    cache.read({ state: {} });
    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith(KEY);
  });
});
