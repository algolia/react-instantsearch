import createInfiniteHitsSessionStorageCache from '../sessionStorage';

const KEY = 'ais.infiniteHits';

describe('createInfiniteHitsSessionStorageCache', () => {
  const originalSessionStorage = window.sessionStorage;
  delete window.sessionStorage;

  let store = {};
  const getItem = jest.fn(key => store[key]);
  const setItem = jest.fn((key, value) => {
    store[key] = value;
  });
  const removeItem = jest.fn(key => delete store[key]);

  beforeAll(() => {
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem,
        setItem,
        removeItem,
      },
    });
  });

  beforeEach(() => {
    store = {};
  });

  afterEach(() => {
    getItem.mockClear();
    setItem.mockClear();
    removeItem.mockClear();
  });

  afterAll(() => {
    window.sessionStorage = originalSessionStorage;
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
    getItem.mockImplementation(() => '{invalid_json}');
    const cache = createInfiniteHitsSessionStorageCache();
    cache.read({ state: {} });
    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith(KEY);
  });

  it('returns null if sessionStorage.getItem() throws', () => {
    getItem.mockImplementation(() => {
      throw new Error();
    });
    const cache = createInfiniteHitsSessionStorageCache();
    expect(cache.read({ state: {} })).toBeNull();
  });

  it('does nothing if sessionStorage.setItem() throws', () => {
    setItem.mockImplementation(() => {
      throw new Error();
    });
    const cache = createInfiniteHitsSessionStorageCache();
    expect(() => {
      cache.write({ state: {}, hits: [] });
    }).not.toThrow();
  });
});
