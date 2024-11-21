import { isEqual } from 'lodash';
import mapValues from 'lodash.mapvalues'
import sortAny from 'sort-any';

export const toMatchObjectIgnoringArrayOrder = (received: any, expected: any) => {
  /*function deepSort(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(deepSort).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    } else if (obj && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((sortedObj, key) => {
          sortedObj[key] = deepSort(obj[key]);
          return sortedObj;
        }, {} as any);
    }
    return obj;
  }*/

  function deepSort(object: any): any {
    if (object instanceof Map) {
      return sortAny([...object]);
    }
    if (!Array.isArray(object)) {
      if (typeof object !== 'object' || object === null || object instanceof Date) {
        return object;
      }
      return mapValues(object, deepSort);
    }
    return sortAny(object.map(deepSort));
  };

  const normalizedReceived = deepSort(received)
  const normalizedExpected = deepSort(expected)

  const pass = isEqual(normalizedReceived, normalizedExpected);

  if (pass) {
    return {
      message: () => `Expected objects not to match, but they do.`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `Expected objects to match, but they do not.\n\nExpected:\n${JSON.stringify(
          normalizedExpected,
          null,
          2
        )}\n\nReceived:\n${JSON.stringify(normalizedReceived, null, 2)}`,
      pass: false,
    };
  }
};

export default {
  toMatchObjectIgnoringArrayOrder,
};

expect.extend({
  toMatchObjectIgnoringArrayOrder,
});

declare module 'expect' {
  interface Matchers<R> {
    toMatchObjectIgnoringArrayOrder(expected: any): R;
  }
}