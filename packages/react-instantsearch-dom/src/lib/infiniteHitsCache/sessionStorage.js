import isEqual from 'react-fast-compare';

function getStateWithoutPage(state) {
  const { page, ...rest } = state;
  return rest;
}

const KEY = 'ais.infinitehits';

function hasSessionStorage() {
  return (
    typeof window !== 'undefined' &&
    typeof window.sessionStorage !== 'undefined'
  );
}

export default function getInfiniteHitsSessionStorageCache() {
  return {
    read({ state }) {
      if (!hasSessionStorage()) {
        return null;
      }
      try {
        const cache = JSON.parse(window.sessionStorage.getItem(KEY));
        return isEqual(cache.state, getStateWithoutPage(state))
          ? cache.hits
          : null;
      } catch (_error) {
        return null;
      }
    },
    write({ state, hits }) {
      if (!hasSessionStorage()) {
        return;
      }
      try {
        window.sessionStorage.setItem(
          KEY,
          JSON.stringify({
            state: getStateWithoutPage(state),
            hits,
          })
        );
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    },
  };
}
