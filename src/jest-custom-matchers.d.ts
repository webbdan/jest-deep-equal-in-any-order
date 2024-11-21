import 'jest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchObjectIgnoringArrayOrder(expected: object): R;
    }
  }
}