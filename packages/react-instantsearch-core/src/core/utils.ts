import { isEmpty } from 'lodash';

// From https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
export const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
};

export const getDisplayName = Component =>
  Component.displayName || Component.name || 'UnknownComponent';

const resolved = Promise.resolve();
export const defer = f => {
  resolved.then(f);
};

const isPlainObject = (value: any): value is object =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const removeEmptyKey = (obj: object) => {
  Object.keys(obj).forEach(key => {
    if (!isPlainObject(obj[key])) {
      return;
    }

    if (isEmpty(obj[key])) {
      delete obj[key];
    } else {
      removeEmptyKey(obj[key]);
    }
  });

  return obj;
};

export function addAbsolutePositions(hits, hitsPerPage, page) {
  return hits.map((hit, index) => ({
    ...hit,
    __position: hitsPerPage * page + index + 1,
  }));
}

export function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }
  return hits.map(hit => ({
    ...hit,
    __queryID: queryID,
  }));
}
