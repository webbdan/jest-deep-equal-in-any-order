import matchers from '../src/toMatchIgnoringArrayOrder';
import { expect } from '@jest/globals';

expect.extend(matchers);

describe('toMatchObjectIgnoringArrayOrder', () => {
  it('matches objects with arrays in any order', () => {
    const actual = {
      name: 'John Doe',
      addresses: [
        { addressLineOne: '15 Giant Way' },
        { addressLineOne: '5 Hampden Gardens' },
      ],
    };

    const expected = {
      name: 'John Doe',
      addresses: [
        { addressLineOne: '5 Hampden Gardens' },
        { addressLineOne: '15 Giant Way' },
      ],
    };

    expect(actual).toMatchObjectIgnoringArrayOrder(expected);
  });

  it('works as well as the chai matcher', () => {
    expect([1, 2]).toMatchObjectIgnoringArrayOrder([2, 1]);
    expect([1, 2]).toMatchObjectIgnoringArrayOrder([2, 1, 3]);
    expect({ foo: [1, 2], bar: [4, 89, 22] }).toMatchObjectIgnoringArrayOrder({ foo: [2, 1], bar: [4, 22, 89] });
    expect({ foo: ['foo-1', 'foo-2', [1, 2], null ] }).toMatchObjectIgnoringArrayOrder({ foo: [null, [1, 2], 'foo-1', 'foo-2'] });
    expect({ foo: [1, 2], bar: { baz: ['a', 'b', { lorem: [5, 6] }] } }).toMatchObjectIgnoringArrayOrder({ foo: [2, 1], bar: { baz: ['b', 'a', { lorem: [6, 5] }] } });
  })

  it('matches objects with nested arrays in any order', () => {
    const actual = {
      name: 'John Doe',
      addresses: [
        { addressLineOne: '15 Giant Way' },
        { addressLineOne: '5 Hampden Gardens' },
      ],
      nested: [
        {
          nestedagain: [
            { 'three':3, 'one': 1, 'two': 2 }]
        },
        {
          nestedagain: [
            { 'one': 1 }]
        }
      ]
    };

    const expected = {
      name: 'John Doe',
      addresses: [
        { addressLineOne: '5 Hampden Gardens' },
        { addressLineOne: '15 Giant Way' },
      ],
      nested: [
        {
          nestedagain: [
            { 'two': 2, 'one': 1, 'three':3 }]
        },
        {
          nestedagain: [
            { 'one': 1 }]
        }
      ]
    };

    expect(actual).toMatchObjectIgnoringArrayOrder(expected);
  });

  it('fails if objects do not match', () => {
    const actual = {
      name: 'Jane Doe',
      addresses: [
        { addressLineOne: '15 Giant Way' },
        { addressLineOne: '5 Hampden Gardens' },
      ],
    };

    const expected = {
      name: 'John Doe',
      addresses: [
        { addressLineOne: '5 Hampden Gardens' },
        { addressLineOne: '15 Giant Way' },
      ],
    };

    expect(actual).not.toMatchObjectIgnoringArrayOrder(expected);
  });
});
