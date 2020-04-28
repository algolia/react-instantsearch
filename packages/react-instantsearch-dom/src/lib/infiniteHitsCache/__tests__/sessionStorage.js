import getInfiniteHitsSessionStorageCache from '../sessionStorage';

describe('getInfiniteHitsSessionStorageCache', () => {
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
    const cache = getInfiniteHitsSessionStorageCache();
    expect(cache.read({})).toBeNull();
  });

  it('returns what it was assigned before', () => {
    const cache = getInfiniteHitsSessionStorageCache();
    const state = { q: 'hello' };
    const hits = { 1: ['a', 'b', 'c'] };
    cache.write({ state, hits });
    expect(cache.read({ state })).toEqual(hits);
  });

  it('returns null if the state is different', () => {
    const cache = getInfiniteHitsSessionStorageCache();
    const state = { q: 'hello' };
    const newState = { q: 'world' };
    const hits = { 1: ['a', 'b', 'c'] };
    cache.write({ state, hits });
    expect(cache.read({ state: newState })).toBeNull();
  });
});
