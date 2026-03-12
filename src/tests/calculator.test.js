const { calculate } = require('../calculator');

describe('Calculator', () => {
  test('adds 2 + 3', () => {
    expect(calculate('add', 2, 3)).toBe(5);
  });

  test('subtracts 10 - 4', () => {
    expect(calculate('sub', 10, 4)).toBe(6);
  });

  test('multiplies 45 * 2', () => {
    expect(calculate('mul', 45, 2)).toBe(90);
  });

  test('divides 20 / 5', () => {
    expect(calculate('div', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => calculate('div', 10, 0)).toThrow(/Division by zero/);
  });

  test('symbol aliases work', () => {
    expect(calculate('+', 1, 2)).toBe(3);
    expect(calculate('-', 5, 3)).toBe(2);
    expect(calculate('*', 3, 3)).toBe(9);
    expect(calculate('/', 8, 2)).toBe(4);
  });

  test('unknown command throws', () => {
    expect(() => calculate('foo', 1, 1)).toThrow(/Unknown command/);
  });
});
